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
	});
});
