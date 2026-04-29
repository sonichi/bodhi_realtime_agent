// SPDX-License-Identifier: MIT

import { describe, expect, it } from 'vitest';
import {
	type OpenClawQueueEvent,
	OpenClawTaskManager,
	OpenClawTaskQueueTimeoutError,
	type OpenClawThreadEvent,
} from '../../examples/lib/openclaw-task-manager.js';

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('OpenClawTaskManager', () => {
	it('reuses the active calendar thread for follow-up tasks without threadHint', async () => {
		const threadEvents: OpenClawThreadEvent[] = [];
		const manager = new OpenClawTaskManager({
			sessionKeyForThread: (threadId) => `bodhi:test:${threadId}`,
		});

		const lease1 = await manager.acquire({
			message: 'Check my calendar for conflicts next Tuesday at 9:30 AM',
			onThreadResolved: (event) => threadEvents.push(event),
		});

		const lease2 = await manager.acquire({
			message: 'Re-check that calendar conflict again and confirm',
			onThreadResolved: (event) => threadEvents.push(event),
		});

		expect(lease2.threadId).toBe(lease1.threadId);
		expect(threadEvents[1]?.reason).toBe('heuristic_active');

		lease2.release('completed');
		lease1.release('completed');
	});

	it('reuses recent completed thread for follow-up tasks', async () => {
		const threadEvents: OpenClawThreadEvent[] = [];
		const manager = new OpenClawTaskManager({
			sessionKeyForThread: (threadId) => `bodhi:test:${threadId}`,
			recentWindowMs: 10_000,
		});

		const lease1 = await manager.acquire({
			message: 'Check my calendar for conflicts next Tuesday at 9:30 AM',
			onThreadResolved: (event) => threadEvents.push(event),
		});
		lease1.release('completed');

		const lease2 = await manager.acquire({
			message: 'Status update on that calendar conflict again',
			onThreadResolved: (event) => threadEvents.push(event),
		});

		expect(lease2.threadId).toBe(lease1.threadId);
		expect(threadEvents[1]?.reason).toBe('heuristic_recent');

		lease2.release('completed');
	});

	it('creates separate threads for independent same-domain tasks', async () => {
		const manager = new OpenClawTaskManager({
			sessionKeyForThread: (threadId) => `bodhi:test:${threadId}`,
		});

		const lease1 = await manager.acquire({
			message: 'Check my calendar for conflicts next Tuesday',
		});
		lease1.release('completed');

		const lease2 = await manager.acquire({
			message: 'Check my calendar for conflicts next Thursday',
		});

		expect(lease2.threadId).not.toBe(lease1.threadId);
		lease2.release('completed');
	});

	it('times out queued tasks when semaphore is saturated', async () => {
		const queuedEvents: OpenClawQueueEvent[] = [];
		const manager = new OpenClawTaskManager({
			sessionKeyForThread: (threadId) => `bodhi:test:${threadId}`,
			maxConcurrent: 1,
			queueWarnMs: 1,
			queueTimeoutMs: 20,
		});

		const lease1 = await manager.acquire({
			message: 'Analyze the repo',
		});

		await expect(
			manager.acquire({
				message: 'Analyze another repo',
				onQueued: (event) => queuedEvents.push(event),
			}),
		).rejects.toBeInstanceOf(OpenClawTaskQueueTimeoutError);

		expect(queuedEvents.some((event) => event.stage === 'semaphore')).toBe(true);
		lease1.release('completed');
	});

	it('serializes calendar write operations with a write lock', async () => {
		const queuedEvents: OpenClawQueueEvent[] = [];
		const manager = new OpenClawTaskManager({
			sessionKeyForThread: (threadId) => `bodhi:test:${threadId}`,
			maxConcurrent: 2,
			queueWarnMs: 1,
			queueTimeoutMs: 500,
		});

		const lease1 = await manager.acquire({
			message: 'Reschedule my meetings next Tuesday to the afternoon',
		});

		const secondAcquire = manager.acquire({
			message: 'Confirm the rescheduling of those meetings',
			onQueued: (event) => queuedEvents.push(event),
		});

		await sleep(15);
		expect(queuedEvents.some((event) => event.stage === 'lock')).toBe(true);

		lease1.release('completed');
		const lease2 = await secondAcquire;
		lease2.release('completed');
	});

	it('serializes email write operations with a write lock', async () => {
		const queuedEvents: OpenClawQueueEvent[] = [];
		const manager = new OpenClawTaskManager({
			sessionKeyForThread: (threadId) => `bodhi:test:${threadId}`,
			maxConcurrent: 2,
			queueWarnMs: 1,
			queueTimeoutMs: 500,
		});

		const lease1 = await manager.acquire({
			message: 'Send an email newsletter to team@company.com',
		});

		const secondAcquire = manager.acquire({
			message: 'Draft and send a follow-up email',
			onQueued: (event) => queuedEvents.push(event),
		});

		await sleep(15);
		expect(
			queuedEvents.some(
				(event) => event.stage === 'lock' && event.lockKey?.startsWith('email-write:'),
			),
		).toBe(true);

		lease1.release('completed');
		const lease2 = await secondAcquire;
		lease2.release('completed');
	});

	it('does not block independent calendar and email writes', async () => {
		const manager = new OpenClawTaskManager({
			sessionKeyForThread: (threadId) => `bodhi:test:${threadId}`,
			maxConcurrent: 2,
			queueWarnMs: 1,
			queueTimeoutMs: 500,
		});

		const lease1 = await manager.acquire({
			message: 'Reschedule my meetings next Tuesday to the afternoon',
		});

		const secondAcquire = manager.acquire({
			message: 'Send an email newsletter to team@company.com',
		});

		const lease2 = await Promise.race([secondAcquire, sleep(50).then(() => null)]);
		expect(lease2).not.toBeNull();
		if (!lease2) {
			lease1.release('completed');
			const recovered = await secondAcquire;
			recovered.release('completed');
			throw new Error('Expected independent calendar/email writes to run in parallel');
		}

		lease2.release('completed');
		lease1.release('completed');
	});

	it('lease release is idempotent', async () => {
		const manager = new OpenClawTaskManager({
			sessionKeyForThread: (threadId) => `bodhi:test:${threadId}`,
			maxConcurrent: 1,
		});

		const lease = await manager.acquire({
			message: 'Check my calendar for next Tuesday',
		});
		lease.release('completed');
		lease.release('completed');

		const stats = manager.getStats();
		expect(stats.activeTasks).toBe(0);
		expect(stats.activeSlots).toBe(0);
	});
});
