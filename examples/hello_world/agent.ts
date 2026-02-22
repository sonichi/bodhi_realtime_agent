// SPDX-License-Identifier: MIT

/**
 * Hello World — Multi-Agent Voice Assistant
 *
 * Demonstrates key features of the Bodhi Realtime Agent Framework:
 *
 *   1. Multi-agent transfer  — Main agent hands off to a math specialist
 *   2. Background subagent   — Long-running "deep research" tool runs asynchronously
 *   3. Image generation       — Creates images via Gemini and pushes them to the client
 *   4. Voice pacing           — Declarative behaviors API with built-in speechSpeed preset
 *   5. Google Search          — Grounded web search via Gemini
 *
 * Usage:
 *   GEMINI_API_KEY=your_key pnpm tsx examples/hello_world/agent.ts
 */

import { google } from '@ai-sdk/google';
import { GoogleGenAI } from '@google/genai';
import { tool } from 'ai';
import { z } from 'zod';
import { VoiceSession } from '../../src/index.js';
import { speechSpeed } from '../../src/behaviors/presets.js';
import type {
	MainAgent,
	SubagentConfig,
	ToolContext,
	ToolDefinition,
} from '../../src/index.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const API_KEY = process.env.GEMINI_API_KEY ?? '';
if (!API_KEY) {
	console.error('Error: set GEMINI_API_KEY environment variable');
	process.exit(1);
}

const PORT = Number(process.env.PORT) || 9900;
const HOST = process.env.HOST || '0.0.0.0';
const SESSION_ID = `session_${Date.now()}`;

/** Compact timestamp for logs. */
const ts = () => new Date().toISOString().slice(11, 23);

// ---------------------------------------------------------------------------
// Tools — inline
// ---------------------------------------------------------------------------

/** Calculator tool — evaluates mathematical expressions safely. */
const calculate: ToolDefinition = {
	name: 'calculate',
	description: `Evaluate a mathematical expression.
Supports: sqrt, sin, cos, tan, log, log10, exp, abs, round, pow, pi, e
Examples: "2 + 2", "sqrt(16)", "sin(pi/2)", "pow(2, 10)"`,
	parameters: z.object({
		expression: z.string().describe('The mathematical expression to evaluate'),
	}),
	execution: 'inline',
	execute: async (args) => {
		const { expression } = args as { expression: string };

		const mathFunctions: Record<string, unknown> = {
			sqrt: Math.sqrt,
			sin: Math.sin,
			cos: Math.cos,
			tan: Math.tan,
			log: Math.log,
			log10: Math.log10,
			exp: Math.exp,
			abs: Math.abs,
			round: Math.round,
			pow: Math.pow,
			pi: Math.PI,
			e: Math.E,
			PI: Math.PI,
			E: Math.E,
		};

		try {
			const safeExpression = expression.replace(
				/\b(sqrt|sin|cos|tan|log|log10|exp|abs|round|pow|pi|PI|e|E)\b/g,
				(match) => `mathFunctions.${match.toLowerCase()}`,
			);

			const fn = new Function('mathFunctions', `return ${safeExpression}`);
			const result = fn(mathFunctions);

			console.log(`${ts()} [Tool] calculate: ${expression} = ${result}`);
			return { expression, result };
		} catch (error) {
			return {
				error: `Error evaluating "${expression}": ${error instanceof Error ? error.message : 'Unknown error'}`,
			};
		}
	},
};

/** Returns the current date/time in an optional timezone. */
const getCurrentTime: ToolDefinition = {
	name: 'get_current_time',
	description: 'Get the current date and time. Optionally specify a timezone.',
	parameters: z.object({
		timezone: z
			.string()
			.optional()
			.describe('Timezone name (e.g., "UTC", "America/Los_Angeles"). Defaults to local time.'),
	}),
	execution: 'inline',
	execute: async (args) => {
		const { timezone } = args as { timezone?: string };
		const now = new Date();
		try {
			if (timezone) {
				const formatted = now.toLocaleString('en-US', {
					timeZone: timezone,
					dateStyle: 'full',
					timeStyle: 'long',
				});
				return { timezone, time: formatted };
			}
			return {
				timezone: 'local',
				time: now.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' }),
			};
		} catch {
			return { timezone: 'UTC', time: now.toISOString() };
		}
	},
};

/**
 * Image generation tool — generates images using Gemini and sends them to the web client.
 * Uses @google/genai SDK directly for image output capabilities.
 */
const generateImage: ToolDefinition = {
	name: 'generate_image',
	description: `Generate an image and display it to the user.
ALWAYS call this tool when the user wants any kind of picture, image, card, illustration, or visual content.
Do NOT describe the image verbally instead of calling this tool — you MUST call this tool to actually create it.`,
	parameters: z.object({
		prompt: z.string().describe('Detailed description of the image to generate'),
	}),
	execution: 'inline',
	timeout: 60_000,
	execute: async (args, ctx: ToolContext) => {
		const { prompt } = args as { prompt: string };
		console.log(`${ts()} [Tool] generate_image: ${prompt}`);

		const ai = new GoogleGenAI({ apiKey: API_KEY });

		try {
			const response = await ai.models.generateContent({
				model: 'gemini-2.5-flash-image',
				contents: prompt,
				config: { responseModalities: ['TEXT', 'IMAGE'] },
			});

			const parts = response.candidates?.[0]?.content?.parts ?? [];
			for (const part of parts) {
				if (part.inlineData?.data) {
					ctx.sendJsonToClient?.({
						type: 'image',
						data: {
							base64: part.inlineData.data,
							mimeType: part.inlineData.mimeType ?? 'image/png',
							description: prompt,
						},
					});
					console.log(`${ts()} [Tool] Image generated for: ${prompt}`);
					return { status: 'success', description: `Image generated: ${prompt}` };
				}
			}

			const text = response.text ?? '';
			return { status: 'no_image', description: text || 'No image was generated' };
		} catch (error) {
			const msg = error instanceof Error ? error.message : String(error);
			console.error(`${ts()} [Tool] generate_image error: ${msg}`);
			return { error: msg };
		}
	},
};

/** End session tool — gracefully closes the voice session when the user says goodbye. */
const endSession: ToolDefinition = {
	name: 'end_session',
	description: 'End the voice session gracefully. Call this when the user says goodbye, wants to hang up, or indicates they are done.',
	parameters: z.object({}),
	execution: 'inline',
	execute: async (_args, ctx: ToolContext) => {
		console.log(`${ts()} [Tool] end_session: User requested session end`);
		setTimeout(async () => {
			ctx.sendJsonToClient?.({ type: 'session_end', reason: 'user_goodbye' });
		}, 5000);
		return { status: 'ending', message: 'Session will close after goodbye.' };
	},
};

// ---------------------------------------------------------------------------
// Tools — background (triggers a subagent)
// ---------------------------------------------------------------------------

/**
 * A background tool that is handed off to a subagent.
 * While the subagent works, Gemini keeps talking to the user.
 * When the subagent finishes, the result is injected back and spoken aloud.
 */
const deepResearch: ToolDefinition = {
	name: 'deep_research',
	description:
		'Perform in-depth research on a topic. Use this for questions that need thorough investigation. Results arrive after a short delay.',
	parameters: z.object({
		topic: z.string().describe('The research topic'),
	}),
	execution: 'background',
	pendingMessage:
		'Research is underway. I will share the findings once they are ready.',
	timeout: 30_000,
	execute: async () => ({}),
};

/**
 * Subagent configuration for the deep_research tool.
 * Uses Vercel AI SDK tools (not framework ToolDefinitions).
 */
const deepResearchSubagent: SubagentConfig = {
	name: 'research_subagent',
	instructions:
		'You are a research assistant. Use the search tool to find information, then write a concise summary.',
	maxSteps: 3,
	tools: {
		search: tool({
			description: 'Search for information on a topic.',
			parameters: z.object({
				query: z.string().describe('Search query'),
			}),
			execute: async ({ query }) => {
				console.log(`${ts()} [Subagent] Searching: "${query}"`);
				await new Promise((r) => setTimeout(r, 2000));
				return {
					results: [
						`Latest developments in "${query}" as of 2026.`,
						`Key facts: ${query} is a rapidly evolving field.`,
						`Experts suggest watching ${query} closely this year.`,
					],
				};
			},
		}),
	},
};

// ---------------------------------------------------------------------------
// Tools — agent transfer
// ---------------------------------------------------------------------------

const transferFromMain: ToolDefinition = {
	name: 'transfer_to_agent',
	description: `Transfer the conversation to a specialist agent.
- "math_expert": For complex math questions or detailed mathematical explanations.`,
	parameters: z.object({
		agent_name: z.enum(['math_expert']).describe('The agent to transfer to'),
	}),
	execution: 'inline',
	execute: async () => ({ status: 'transferred' }),
};

const transferToMain: ToolDefinition = {
	name: 'transfer_to_agent',
	description: `Transfer the conversation back to the main assistant.
Use this when you've finished helping with the specialized task
and the user wants general assistance again.`,
	parameters: z.object({
		agent_name: z.literal('main').describe('The agent to transfer to'),
	}),
	execution: 'inline',
	execute: async () => ({ status: 'transferred' }),
};

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------

const mainAgent: MainAgent = {
	name: 'main',
	greeting:
		'[System: A user just connected to the voice session. Greet them warmly. Introduce yourself as Bodhi, their voice assistant. Give a brief overview of what you can help with: looking things up on the web like weather or news, doing math calculations, telling the time, creating pictures from a description, and adjusting your speech speed if they need you to talk slower or faster. Then ask how you can help today. Keep it friendly and not too long.]',
	instructions: `You are a warm, patient voice assistant named Bodhi. Keep responses concise — this is voice.

VOICE & PACING RULES (follow these strictly):
- Deliver ONE idea per turn. Never chain two topics together.
- Keep every response under 3 sentences unless the user asks for more detail.
- CRITICAL: If the user mentions speed, pace, slower, or faster — even a single word like "slow" or "speak" — you MUST call the set_speech_speed tool BEFORE responding. Verbally agreeing to change speed does nothing. Only the tool changes your pace. Use preset "slow", "normal", or "fast".

TOOLS YOU HAVE:
- Calculator: Do math for the user.
- Current Time: Tell the user what time and date it is.
- Google Search: Look up weather, news, or current events on the web.
- Speech Speed: Make your voice slower or faster when the user asks.
- Image Generation: Create a picture from a description.
- Deep Research: For in-depth questions, delegates to a research assistant.
- Math Expert: For harder math questions, you can hand off to a math specialist.
- End Session: When the user says goodbye or is done, call end_session.

MANDATORY TOOL RULES (violating these is a failure):
1. SPEECH SPEED: When the user asks to speak slower, faster, or at normal speed, you MUST call set_speech_speed IMMEDIATELY. Do NOT respond first. Do NOT say "sure" first. Call the tool, THEN confirm. If you say "I've adjusted" without calling the tool, you are LYING — only the tool changes your speed.
2. IMAGE GENERATION: When the user asks for any picture, image, card, or illustration, you MUST call generate_image IMMEDIATELY. Do NOT describe the image verbally instead.
3. AGENT TRANSFER: When the user asks for math help or complex calculations, say "Let me connect you with the math expert" and IMMEDIATELY call transfer_to_agent with agent_name "math_expert". Do NOT ask "should I transfer you?" — just do it.
4. NEVER claim you did something without calling the corresponding tool. Tools are the ONLY way to take action.
5. When the user says goodbye or is done, say a warm goodbye and call end_session.`,
	tools: [calculate, getCurrentTime, generateImage, endSession, deepResearch, transferFromMain],
	googleSearch: true,
	onEnter: async () => console.log(`${ts()} [Agent] Main agent entered`),
	onExit: async () => console.log(`${ts()} [Agent] Main agent exited`),
};

const mathExpert: MainAgent = {
	name: 'math_expert',
	greeting:
		'You just transferred to the math expert. Greet the user briefly — one short sentence — then ask what math problem they need help with.',
	instructions: `You are a patient math helper named Bodhi. You explain math in plain, simple language.

HOW TO EXPLAIN MATH:
- Break every problem into small steps.
- Say each number clearly. For example, say "twenty-five" not "25".
- After each step, briefly say what you did and what comes next.
- Use the calculator tool to do the actual math — never ask the user to compute.

WHEN DONE:
- When the user has no more math questions, say: "I will take you back to your main assistant now."
- Then call transfer_to_agent with agent_name "main".`,
	tools: [calculate, transferToMain],
	onEnter: async () => console.log(`${ts()} [Agent] Math expert entered`),
	onExit: async () => console.log(`${ts()} [Agent] Math expert exited`),
};

// ---------------------------------------------------------------------------
// Start session
// ---------------------------------------------------------------------------

async function main() {
	const session = new VoiceSession({
		sessionId: SESSION_ID,
		userId: 'demo_user',
		apiKey: API_KEY,
		agents: [mainAgent, mathExpert],
		initialAgent: 'main',
		port: PORT,
		host: HOST,
		model: google('gemini-2.0-flash'),
		behaviors: [speechSpeed()],
		geminiModel: 'gemini-2.5-flash-native-audio-preview-12-2025',
		speechConfig: { voiceName: 'Puck' },

		// Map the background tool name → subagent config
		subagentConfigs: {
			deep_research: deepResearchSubagent,
		},

		hooks: {
			onSessionStart: (e) => {
				console.log(`${ts()} [Session] Started: ${e.sessionId} (agent: ${e.agentName})`);
			},
			onSessionEnd: (e) => {
				console.log(`${ts()} [Session] Ended: ${e.sessionId} (${e.reason})`);
			},
			onToolCall: (e) =>
				console.log(`${ts()} [Hook] Tool called: ${e.toolName} (${e.execution})`),
			onToolResult: (e) =>
				console.log(`${ts()} [Hook] Tool result: ${e.toolCallId} (${e.status})`),
			onAgentTransfer: (e) =>
				console.log(`${ts()} [Hook] Agent transfer: ${e.fromAgent} → ${e.toAgent}`),
			onError: (e) =>
				console.error(`${ts()} [Error] ${e.component}: ${e.error.message} (${e.severity})`),
		},
	});

	// Subscribe to events for logging
	let lastLoggedIndex = 0;
	session.eventBus.subscribe('turn.end', (payload) => {
		console.log(`${ts()} [Event] Turn ended: ${payload.turnId}`);
		const items = session.conversationContext.items;
		const newItems = items.slice(lastLoggedIndex);
		lastLoggedIndex = items.length;
		for (const item of newItems) {
			if (item.role === 'user' || item.role === 'assistant') {
				console.log(`${ts()}   [${item.role}] ${item.content}`);
			}
		}
	});

	session.eventBus.subscribe('agent.transfer', (payload) => {
		console.log(`${ts()} [Event] Agent transfer: ${payload.fromAgent} → ${payload.toAgent}`);
	});

	// Handle shutdown
	const shutdown = async () => {
		console.log(`\n${ts()} Shutting down...`);
		await session.close('user_hangup');
		process.exit(0);
	};
	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);

	// Start the session
	await session.start();

	console.log('============================================================');
	console.log('Bodhi Realtime Agent — Hello World Example');
	console.log('============================================================');
	console.log();
	console.log(`  WebSocket audio server: ws://localhost:${PORT}`);
	console.log(`  Session ID: ${SESSION_ID}`);
	console.log();
	console.log('Connect a WebSocket audio client and try saying:');
	console.log("  - 'What time is it?'              → inline tool");
	console.log("  - 'What is 25 times 17?'          → calculator");
	console.log("  - 'Speak slower please'            → voice pacing (behaviors API)");
	console.log("  - 'Draw me a cat in a spacesuit'   → image generation");
	console.log("  - 'Research quantum computing'     → background subagent");
	console.log("  - 'I need help with harder math'   → agent transfer");
	console.log("  - 'What is the weather today?'     → Google Search");
	console.log("  - 'Goodbye'                        → end session");
	console.log();
	console.log('Press Ctrl+C to stop.');
	console.log('============================================================');
}

main().catch((err) => {
	console.error('Fatal error:', err);
	process.exit(1);
});
