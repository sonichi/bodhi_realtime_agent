// SPDX-License-Identifier: MIT

import { tool } from 'ai';
import { z } from 'zod';
import type { SubagentConfig } from '../../../src/types/agent.js';
import type { ToolDefinition } from '../../../src/types/tool.js';
import { mergeText, type OpenClawClient } from './openclaw-client.js';
import {
	OpenClawTaskManager,
	OpenClawTaskQueueTimeoutError,
	type OpenClawQueueEvent,
	type OpenClawTaskStatus,
	type OpenClawThreadEvent,
} from './openclaw-task-manager.js';

/**
 * Framework ToolDefinition for the main voice agent (declared to Gemini/OpenAI).
 * execution: 'background' — routes to AgentRouter.handoff() when a matching SubagentConfig exists.
 * The execute body is NOT called by the framework; it's a placeholder for the tool router.
 */
export const askOpenClawTool: ToolDefinition = {
	name: 'ask_openclaw',
	description:
		'Delegate a task to the OpenClaw AI agent. ' +
		'ALWAYS use this for any email request (send/draft/reply/forward/rewrite). ' +
		'ALWAYS use this for any calendar request (lookup/reschedule/schedule). ' +
		'The agent is general-purpose and can handle coding, research, web browsing, ' +
		'writing, sending emails, and much more. Route any user request here.',
	parameters: z.object({
		task: z.string().describe('The task to delegate to OpenClaw'),
	}),
	execution: 'background',
	pendingMessage:
		"I'm sending that to my agent now. I'll let you know what it finds.",
	execute: async () => {
		// Placeholder — ToolCallRouter routes to AgentRouter.handoff() when
		// matching SubagentConfig exists. This body is never reached.
		return { text: 'Routed to subagent', stepCount: 0 };
	},
};

export interface OpenClawSubagentOptions {
	taskManager?: OpenClawTaskManager;
	onQueueEvent?: (event: OpenClawQueueEvent) => void;
	onThreadResolved?: (event: OpenClawThreadEvent) => void;
}

interface OpenClawRunState {
	threadHint?: string;
}

const openClawRelayInstructions = [
	'You are a relay agent between the user and the OpenClaw AI agent.',
	'OpenClaw is a general-purpose agent — it can handle coding, research,',
	'web browsing, writing, emails, and much more.',
	'',
	'WORKFLOW:',
	'1. Call openclaw_chat with the task from the user.',
	'2. If the result has status "needs_input", OpenClaw is asking a clarifying question.',
	'   - The "text" field contains OpenClaw\'s response including the question.',
	'   - Use ask_user to relay the question to the user via voice.',
	'   - When phrasing the question for ask_user, be concise — extract the key question from OpenClaw\'s response.',
	'   - Call openclaw_chat with the user\'s answer to continue.',
	'3. If the result has status "completed", OpenClaw has finished the task.',
	'   - Return a brief voice-friendly summary of what was done.',
	'   - Do NOT read out code verbatim — summarize the outcome.',
	'4. If the result has an error, tell the user what went wrong briefly.',
	'',
	'IMPORTANT:',
	'- Always relay OpenClaw\'s questions to the user — never answer on their behalf.',
	'- Keep your voice summaries short (2-3 sentences max).',
	'- The user is listening via audio — no markdown, no code blocks in your final answer.',
].join('\n');

/**
 * Create the OpenClaw SubagentConfig for interactive subagent delegation.
 *
 * The subagent is given an `openclaw_chat` AI SDK tool that sends messages to
 * the OpenClaw gateway and collects the streaming response. When OpenClaw
 * returns `needs_input`, the subagent LLM uses the injected `ask_user` tool
 * (provided by runSubagent when interactive=true) to relay the question to the
 * user via voice, then calls `openclaw_chat` again with the answer.
 */
export function createOpenClawSubagentConfig(
	client: OpenClawClient,
	sessionId: string,
	options: OpenClawSubagentOptions = {},
): SubagentConfig {
	const baseSessionKey = client.sessionKey(sessionId);
	const taskManager =
		options.taskManager ??
		new OpenClawTaskManager({
			sessionKeyForThread: (threadId) => `${baseSessionKey}:thread:${threadId}`,
			log: (message) => console.log(`[OpenClawTask] ${message}`),
		});

	const createInstance = (): SubagentConfig => {
		const runState: OpenClawRunState = {};
		return {
			name: 'openclaw',
			interactive: true,
			instructions: openClawRelayInstructions,
			tools: {
				openclaw_chat: createOpenClawChatTool(client, taskManager, runState, options),
			},
			maxSteps: 12, // Allow for multi-turn: chat → ask_user → chat → ask_user → ...
			timeout: 300_000, // 5 min for complex coding tasks
		};
	};

	const baseConfig = createInstance();
	// The router calls createInstance on the registered config. Returned
	// per-handoff configs do not need to recursively expose createInstance.
	baseConfig.createInstance = createInstance;
	return baseConfig;
}

/**
 * AI SDK tool that sends a message to the OpenClaw gateway and collects the
 * full streaming response. Returns the accumulated text and final disposition.
 */
function createOpenClawChatTool(
	client: OpenClawClient,
	taskManager: OpenClawTaskManager,
	runState: OpenClawRunState,
	options: OpenClawSubagentOptions,
) {
	return tool({
		description:
			'Send a message to the OpenClaw AI agent and get the response. ' +
			'Returns { status, text } where status is "completed", "needs_input", or "error".',
			parameters: z.object({
				message: z.string().describe('The message to send to OpenClaw'),
			}),
			execute: async ({ message }) => {
				const maxAttempts = 2;

				for (let attempt = 1; attempt <= maxAttempts; attempt++) {
					let lease: Awaited<ReturnType<OpenClawTaskManager['acquire']>> | null = null;
					let releaseStatus: OpenClawTaskStatus = 'failed';
					let shouldRetry = false;
					let terminalResult: { status: string; text?: string; error?: string } | null = null;

					try {
						lease = await taskManager.acquire({
							message,
							threadHint: runState.threadHint,
							onQueued: (event) => {
								console.log(
									`[OpenClaw] Task queued (taskId=${event.taskId}, stage=${event.stage}, waitMs=${event.waitMs}, queueLength=${event.queueLength})`,
								);
								options.onQueueEvent?.(event);
							},
							onThreadResolved: options.onThreadResolved,
						});
						runState.threadHint = lease.threadId;

						console.log(
							`[OpenClaw] Sending message (taskId=${lease.taskId}, threadId=${lease.threadId}, sessionKey=${lease.sessionKey}, domain=${lease.domain}, operation=${lease.operation}, attempt=${attempt}/${maxAttempts}): ${message.slice(0, 200)}`,
						);

						const { runId } = await client.chatSend(lease.sessionKey, message);
						console.log(`[OpenClaw] Run started: ${runId}`);
						let text = '';

						while (true) {
							const event = await client.nextChatEvent(runId);

							if (event.state === 'delta') {
								text = mergeText(text, event.text);
							} else if (event.state === 'final') {
								text = mergeText(text, event.text);
								console.log(
									`[OpenClaw] Run ${runId} completed (${event.finalDisposition}): ${text.slice(0, 200)}`,
								);
								if ((event.finalDisposition ?? 'completed') === 'completed' && text.trim().length === 0) {
									if (attempt < maxAttempts) {
										console.warn(
											`[OpenClaw] Run ${runId} completed with empty text (attempt ${attempt}/${maxAttempts}), retrying once`,
										);
										shouldRetry = true;
										break;
									}
									terminalResult = {
										status: 'error',
										error: 'OpenClaw completed with empty response text',
									};
									break;
								}

								releaseStatus = 'completed';
								terminalResult = {
									status: event.finalDisposition ?? 'completed',
									text,
								};
								break;
							} else if (event.state === 'error' || event.state === 'aborted') {
								console.log(`[OpenClaw] Run ${runId} ${event.state}: ${event.error}`);
								releaseStatus = event.state === 'aborted' ? 'aborted' : 'failed';
								terminalResult = {
									status: 'error',
									error: event.error ?? `OpenClaw run ${event.state}`,
								};
								break;
							}
						}
					} catch (err) {
						if (err instanceof OpenClawTaskQueueTimeoutError) {
							console.warn(
								`[OpenClaw] Queue timeout (stage=${err.stage}, waitedMs=${err.waitedMs}, queueLength=${err.queueLength})`,
							);
							terminalResult = { status: 'error', error: err.userMessage() };
						} else {
							const msg = err instanceof Error ? err.message : String(err);
							console.error(`[OpenClaw] Error sending message: ${msg}`);
							terminalResult = { status: 'error', error: msg };
						}
					} finally {
						lease?.release(releaseStatus);
					}

					if (shouldRetry) {
						continue;
					}
					if (terminalResult) {
						return terminalResult;
					}
				}

				return {
					status: 'error',
					error: 'OpenClaw failed after retry',
				};
			},
		});
}
