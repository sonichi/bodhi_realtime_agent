// SPDX-License-Identifier: MIT

import { afterEach, describe, expect, it, vi } from 'vitest';
import WebSocket from 'ws';
import { MultiClientTransport } from '../../src/transport/multi-client-transport.js';

const TEST_PORT = 19120;

describe('MultiClientTransport', () => {
	let transport: MultiClientTransport | undefined;

	afterEach(async () => {
		await transport?.stop();
		transport = undefined;
	});

	it('fires onDisconnection once when stop closes an active client', async () => {
		const onDisconnection = vi.fn();
		transport = new MultiClientTransport(TEST_PORT, { onDisconnection }, '127.0.0.1');
		await transport.start();

		const ws = new WebSocket(`ws://127.0.0.1:${TEST_PORT}`);
		await new Promise<void>((resolve) => ws.on('open', resolve));

		await transport.stop();
		await new Promise((resolve) => setTimeout(resolve, 25));

		expect(onDisconnection).toHaveBeenCalledTimes(1);
	});
});
