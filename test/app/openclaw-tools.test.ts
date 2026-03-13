// SPDX-License-Identifier: MIT

import { describe, expect, it, vi } from 'vitest';
import type { ChatEvent, OpenClawClient } from '../../examples/openclaw/lib/openclaw-client.js';
import { createOpenClawSubagentConfig } from '../../examples/openclaw/lib/openclaw-tools.js';

function createMockClient(events: ChatEvent[]): OpenClawClient {
	let eventIndex = 0;

	return {
		sessionKey: vi.fn((_sid: string) => 'bodhi:test'),
		chatSend: vi.fn(async (_sessionKey: string, _message: string) => ({ runId: 'run-1' })),
		nextChatEvent: vi.fn(async (_runId: string) => events[eventIndex++]),
	} as unknown as OpenClawClient;
}

describe('openclaw tools', () => {
	it('openclaw_chat preserves delta text when final text is empty', async () => {
		const client = createMockClient([
			{
				source: 'chat',
				runId: 'run-1',
				state: 'delta',
				text: 'Conflict found: Teams sync at 9:30 AM.',
			},
			{
				source: 'chat',
				runId: 'run-1',
				state: 'final',
				text: '',
				finalDisposition: 'completed',
				stopReason: 'stop',
			},
		]);

		const config = createOpenClawSubagentConfig(client, 'session-1');
		const tools = config.tools as Record<
			string,
			{ execute: (args: { message: string }) => Promise<Record<string, unknown>> }
		>;

		const result = await tools.openclaw_chat.execute({ message: 'Check calendar' });
		expect(result).toEqual({
			status: 'completed',
			text: 'Conflict found: Teams sync at 9:30 AM.',
		});
	});

	it('openclaw_chat returns error when completed with empty response text', async () => {
		const client = createMockClient([
			{
				source: 'chat',
				runId: 'run-1',
				state: 'final',
				text: '',
				finalDisposition: 'completed',
				stopReason: 'stop',
			},
			{
				source: 'chat',
				runId: 'run-1',
				state: 'final',
				text: '',
				finalDisposition: 'completed',
				stopReason: 'stop',
			},
		]);

		const config = createOpenClawSubagentConfig(client, 'session-1');
		const tools = config.tools as Record<
			string,
			{ execute: (args: { message: string }) => Promise<Record<string, unknown>> }
		>;

		const result = await tools.openclaw_chat.execute({ message: 'Check calendar' });
		expect(result).toEqual({
			status: 'error',
			error: 'OpenClaw completed with empty response text',
		});
		expect(client.chatSend).toHaveBeenCalledTimes(2);
	});

	it('openclaw_chat retry succeeds when second attempt returns text', async () => {
		const client = createMockClient([
			{
				source: 'chat',
				runId: 'run-1',
				state: 'final',
				text: '',
				finalDisposition: 'completed',
				stopReason: 'stop',
			},
			{
				source: 'chat',
				runId: 'run-1',
				state: 'final',
				text: 'Conflict found on retry.',
				finalDisposition: 'completed',
				stopReason: 'stop',
			},
		]);

		const config = createOpenClawSubagentConfig(client, 'session-1');
		const tools = config.tools as Record<
			string,
			{ execute: (args: { message: string }) => Promise<Record<string, unknown>> }
		>;

		const result = await tools.openclaw_chat.execute({ message: 'Check calendar' });
		expect(result).toEqual({
			status: 'completed',
			text: 'Conflict found on retry.',
		});
		expect(client.chatSend).toHaveBeenCalledTimes(2);
	});

	it('createInstance provides isolated run state between handoffs', async () => {
		const sessionKeys: string[] = [];
		const client = createMockClient([
			{
				source: 'chat',
				runId: 'run-1',
				state: 'final',
				text: 'First check complete.',
				finalDisposition: 'completed',
				stopReason: 'stop',
			},
			{
				source: 'chat',
				runId: 'run-1',
				state: 'final',
				text: 'Second check complete.',
				finalDisposition: 'completed',
				stopReason: 'stop',
			},
		]);
		vi.mocked(client.chatSend).mockImplementation(async (sessionKey: string) => {
			sessionKeys.push(sessionKey);
			return { runId: 'run-1' };
		});

		const rootConfig = createOpenClawSubagentConfig(client, 'session-1');
		expect(rootConfig.createInstance).toBeDefined();

		const first = rootConfig.createInstance?.();
		const second = rootConfig.createInstance?.();
		if (!first || !second) {
			throw new Error('Expected createInstance to return configs');
		}

		const firstTools = first.tools as Record<
			string,
			{ execute: (args: { message: string }) => Promise<Record<string, unknown>> }
		>;
		const secondTools = second.tools as Record<
			string,
			{ execute: (args: { message: string }) => Promise<Record<string, unknown>> }
		>;

		await firstTools.openclaw_chat.execute({
			message: 'Check my calendar conflicts for next Tuesday',
		});
		await secondTools.openclaw_chat.execute({
			message: 'Check my calendar conflicts for next Thursday',
		});

		expect(sessionKeys).toHaveLength(2);
		expect(sessionKeys[0]).not.toBe(sessionKeys[1]);
	});
});
