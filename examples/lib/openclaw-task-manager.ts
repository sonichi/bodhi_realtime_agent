// SPDX-License-Identifier: MIT

import { randomUUID } from 'node:crypto';

export type OpenClawTaskDomain = 'calendar' | 'email' | 'coding' | 'research' | 'other';
export type OpenClawOperationType = 'read' | 'write';
export type OpenClawTaskStatus = 'completed' | 'failed' | 'aborted';
export type OpenClawQueueStage = 'semaphore' | 'lock';
export type OpenClawThreadResolveReason = 'hint' | 'heuristic_active' | 'heuristic_recent' | 'new';

export interface OpenClawQueueEvent {
	stage: OpenClawQueueStage;
	taskId: string;
	threadId: string;
	domain: OpenClawTaskDomain;
	operation: OpenClawOperationType;
	waitMs: number;
	queueLength: number;
	lockKey?: string;
}

export interface OpenClawThreadEvent {
	taskId: string;
	threadId: string;
	domain: OpenClawTaskDomain;
	reason: OpenClawThreadResolveReason;
}

export interface OpenClawTaskAcquireRequest {
	message: string;
	threadHint?: string;
	onQueued?: (event: OpenClawQueueEvent) => void;
	onThreadResolved?: (event: OpenClawThreadEvent) => void;
}

export interface OpenClawTaskLease {
	taskId: string;
	threadId: string;
	sessionKey: string;
	domain: OpenClawTaskDomain;
	operation: OpenClawOperationType;
	release: (status?: OpenClawTaskStatus) => void;
}

export interface OpenClawTaskManagerOptions {
	sessionKeyForThread: (threadId: string) => string;
	maxConcurrent?: number;
	queueWarnMs?: number;
	queueTimeoutMs?: number;
	recentWindowMs?: number;
	threadTtlMs?: number;
	calendarResourceId?: string;
	emailResourceId?: string;
	log?: (message: string) => void;
	now?: () => number;
	createThreadId?: () => string;
}

interface ThreadState {
	threadId: string;
	sessionKey: string;
	domain: OpenClawTaskDomain;
	createdAtMs: number;
	lastUsedAtMs: number;
	lastCompletedAtMs?: number;
	activeTaskCount: number;
}

interface TaskState {
	taskId: string;
	threadId: string;
	domain: OpenClawTaskDomain;
	operation: OpenClawOperationType;
	startedAtMs: number;
	releaseSlot: () => void;
	releaseLock?: () => void;
	released: boolean;
}

interface SemaphoreWaiter {
	createdAtMs: number;
	resolve: (grant: SemaphoreGrant) => void;
	reject: (err: Error) => void;
	warnTimer: ReturnType<typeof setTimeout>;
	timeoutTimer: ReturnType<typeof setTimeout>;
}

interface SemaphoreGrant {
	waitedMs: number;
	release: () => void;
}

interface LockWaiter {
	taskId: string;
	createdAtMs: number;
	resolve: (release: () => void) => void;
	reject: (err: Error) => void;
	warnTimer: ReturnType<typeof setTimeout>;
	timeoutTimer: ReturnType<typeof setTimeout>;
}

interface LockState {
	holderTaskId?: string;
	queue: LockWaiter[];
}

const DEFAULT_MAX_CONCURRENT = 10;
const DEFAULT_QUEUE_WARN_MS = 2_000;
const DEFAULT_QUEUE_TIMEOUT_MS = 30_000;
const DEFAULT_RECENT_WINDOW_MS = 60_000;
const DEFAULT_THREAD_TTL_MS = 10 * 60_000;
const DEFAULT_RESOURCE_ID = 'primary';

const FOLLOW_UP_PATTERN =
	/\b(confirm|proceed|go ahead|that|those|it|again|re-check|recheck|status|update|same)\b/i;
const CALENDAR_PATTERN =
	/\b(calendar|meeting|meetings|reschedule|resched|schedule|appointment|event|standup|conflict)\b/i;
const CALENDAR_WRITE_PATTERN =
	/\b(reschedule|resched|move|cancel|delete|confirm|update|create|book|proceed|go ahead)\b/i;
const EMAIL_PATTERN = /\b(email|mail|newsletter|subject|draft|reply|forward|send)\b/i;
const EMAIL_WRITE_PATTERN = /\b(send|draft|reply|forward|rewrite|compose)\b/i;
const CODING_PATTERN =
	/\b(code|coding|bug|fix|refactor|typescript|python|test|compile|repo|file|function|class)\b/i;
const RESEARCH_PATTERN =
	/\b(research|analy[sz]e|summary|summarize|news|search|look up|investigate)\b/i;

export class OpenClawTaskQueueTimeoutError extends Error {
	readonly stage: OpenClawQueueStage;
	readonly waitedMs: number;
	readonly queueLength: number;

	constructor(stage: OpenClawQueueStage, waitedMs: number, queueLength: number) {
		super(
			stage === 'semaphore'
				? `OpenClaw task queue timeout after ${waitedMs}ms`
				: `OpenClaw lock queue timeout after ${waitedMs}ms`,
		);
		this.name = 'OpenClawTaskQueueTimeoutError';
		this.stage = stage;
		this.waitedMs = waitedMs;
		this.queueLength = queueLength;
	}

	userMessage(): string {
		return 'All my background agents are busy right now. Please retry in a moment.';
	}
}

export function inferTaskDomain(message: string): OpenClawTaskDomain {
	if (CALENDAR_PATTERN.test(message)) return 'calendar';
	if (EMAIL_PATTERN.test(message)) return 'email';
	if (CODING_PATTERN.test(message)) return 'coding';
	if (RESEARCH_PATTERN.test(message)) return 'research';
	return 'other';
}

export function inferOperationType(
	domain: OpenClawTaskDomain,
	message: string,
): OpenClawOperationType {
	if (domain === 'calendar') return CALENDAR_WRITE_PATTERN.test(message) ? 'write' : 'read';
	if (domain === 'email') return EMAIL_WRITE_PATTERN.test(message) ? 'write' : 'read';
	return 'read';
}

export function inferFollowUpIntent(message: string): boolean {
	return FOLLOW_UP_PATTERN.test(message);
}

function maybeUnref(timer: ReturnType<typeof setTimeout>): void {
	if (typeof timer === 'object' && timer && 'unref' in timer) {
		timer.unref();
	}
}

export class OpenClawTaskManager {
	private readonly maxConcurrent: number;
	private readonly queueWarnMs: number;
	private readonly queueTimeoutMs: number;
	private readonly recentWindowMs: number;
	private readonly threadTtlMs: number;
	private readonly calendarResourceId: string;
	private readonly emailResourceId: string;
	private readonly now: () => number;
	private readonly createThreadId: () => string;

	private readonly threads = new Map<string, ThreadState>();
	private readonly tasks = new Map<string, TaskState>();

	private activeSlots = 0;
	private semaphoreQueue: SemaphoreWaiter[] = [];

	private readonly writeLocks = new Map<string, LockState>();

	constructor(private readonly opts: OpenClawTaskManagerOptions) {
		this.maxConcurrent = opts.maxConcurrent ?? DEFAULT_MAX_CONCURRENT;
		this.queueWarnMs = opts.queueWarnMs ?? DEFAULT_QUEUE_WARN_MS;
		this.queueTimeoutMs = opts.queueTimeoutMs ?? DEFAULT_QUEUE_TIMEOUT_MS;
		this.recentWindowMs = opts.recentWindowMs ?? DEFAULT_RECENT_WINDOW_MS;
		this.threadTtlMs = opts.threadTtlMs ?? DEFAULT_THREAD_TTL_MS;
		this.calendarResourceId = opts.calendarResourceId ?? DEFAULT_RESOURCE_ID;
		this.emailResourceId = opts.emailResourceId ?? DEFAULT_RESOURCE_ID;
		this.now = opts.now ?? (() => Date.now());
		this.createThreadId =
			opts.createThreadId ?? (() => randomUUID().replaceAll('-', '').slice(0, 12));
	}

	async acquire(request: OpenClawTaskAcquireRequest): Promise<OpenClawTaskLease> {
		const nowMs = this.now();
		this.cleanupExpiredThreads(nowMs);

		const domain = inferTaskDomain(request.message);
		const operation = inferOperationType(domain, request.message);
		const followUp = inferFollowUpIntent(request.message);
		const { thread, reason } = this.resolveThread(domain, request.threadHint, followUp, nowMs);

		const taskId = `oc_task_${randomUUID().replaceAll('-', '').slice(0, 12)}`;
		request.onThreadResolved?.({
			taskId,
			threadId: thread.threadId,
			domain,
			reason,
		});
		this.log(
			`task.started taskId=${taskId} threadId=${thread.threadId} domain=${domain} operation=${operation} reason=${reason}`,
		);

		const semaphore = await this.acquireSemaphore(
			taskId,
			thread.threadId,
			domain,
			operation,
			request.onQueued,
		);
		let releaseLock: (() => void) | undefined;

		try {
			const lockKey = this.getWriteLockKey(domain, operation);
			if (lockKey) {
				releaseLock = await this.acquireWriteLock(
					lockKey,
					taskId,
					thread.threadId,
					domain,
					operation,
					request.onQueued,
				);
			}
		} catch (err) {
			semaphore.release();
			throw err;
		}

		thread.activeTaskCount += 1;
		thread.lastUsedAtMs = nowMs;

		this.tasks.set(taskId, {
			taskId,
			threadId: thread.threadId,
			domain,
			operation,
			startedAtMs: nowMs,
			releaseSlot: semaphore.release,
			releaseLock,
			released: false,
		});

		return {
			taskId,
			threadId: thread.threadId,
			sessionKey: thread.sessionKey,
			domain,
			operation,
			release: (status = 'completed') => this.releaseTask(taskId, status),
		};
	}

	getStats(): {
		activeTasks: number;
		activeSlots: number;
		queuedTasks: number;
		activeThreads: number;
	} {
		return {
			activeTasks: this.tasks.size,
			activeSlots: this.activeSlots,
			queuedTasks: this.semaphoreQueue.length,
			activeThreads: [...this.threads.values()].filter((t) => t.activeTaskCount > 0).length,
		};
	}

	private log(message: string): void {
		this.opts.log?.(message);
	}

	private resolveThread(
		domain: OpenClawTaskDomain,
		threadHint: string | undefined,
		isFollowUp: boolean,
		nowMs: number,
	): { thread: ThreadState; reason: OpenClawThreadResolveReason } {
		if (threadHint) {
			const hinted = this.threads.get(threadHint);
			if (hinted) return { thread: hinted, reason: 'hint' };
		}

		if (isFollowUp) {
			const active = [...this.threads.values()]
				.filter((thread) => thread.domain === domain && thread.activeTaskCount > 0)
				.sort((a, b) => b.lastUsedAtMs - a.lastUsedAtMs)[0];
			if (active) return { thread: active, reason: 'heuristic_active' };

			const recent = [...this.threads.values()]
				.filter(
					(thread) =>
						thread.domain === domain &&
						thread.lastCompletedAtMs != null &&
						nowMs - thread.lastCompletedAtMs <= this.recentWindowMs,
				)
				.sort((a, b) => (b.lastCompletedAtMs ?? 0) - (a.lastCompletedAtMs ?? 0))[0];
			if (recent) return { thread: recent, reason: 'heuristic_recent' };
		}

		const threadId = `oc_thread_${this.createThreadId()}`;
		const created: ThreadState = {
			threadId,
			sessionKey: this.opts.sessionKeyForThread(threadId),
			domain,
			createdAtMs: nowMs,
			lastUsedAtMs: nowMs,
			activeTaskCount: 0,
		};
		this.threads.set(threadId, created);
		return { thread: created, reason: 'new' };
	}

	private async acquireSemaphore(
		taskId: string,
		threadId: string,
		domain: OpenClawTaskDomain,
		operation: OpenClawOperationType,
		onQueued?: (event: OpenClawQueueEvent) => void,
	): Promise<SemaphoreGrant> {
		if (this.activeSlots < this.maxConcurrent) {
			this.activeSlots += 1;
			return { waitedMs: 0, release: () => this.releaseSemaphore() };
		}

		const createdAtMs = this.now();
		return new Promise<SemaphoreGrant>((resolve, reject) => {
			const waiter: SemaphoreWaiter = {
				createdAtMs,
				resolve,
				reject,
				warnTimer: setTimeout(() => {
					onQueued?.({
						stage: 'semaphore',
						taskId,
						threadId,
						domain,
						operation,
						waitMs: this.now() - createdAtMs,
						queueLength: this.semaphoreQueue.length,
					});
				}, this.queueWarnMs),
				timeoutTimer: setTimeout(() => {
					const idx = this.semaphoreQueue.indexOf(waiter);
					if (idx >= 0) this.semaphoreQueue.splice(idx, 1);
					reject(
						new OpenClawTaskQueueTimeoutError(
							'semaphore',
							this.now() - createdAtMs,
							this.semaphoreQueue.length,
						),
					);
				}, this.queueTimeoutMs),
			};
			maybeUnref(waiter.warnTimer);
			maybeUnref(waiter.timeoutTimer);
			this.semaphoreQueue.push(waiter);
		});
	}

	private releaseSemaphore(): void {
		if (this.activeSlots > 0) this.activeSlots -= 1;
		if (this.activeSlots >= this.maxConcurrent || this.semaphoreQueue.length === 0) return;
		const waiter = this.semaphoreQueue.shift();
		if (!waiter) return;
		clearTimeout(waiter.warnTimer);
		clearTimeout(waiter.timeoutTimer);
		this.activeSlots += 1;
		waiter.resolve({
			waitedMs: this.now() - waiter.createdAtMs,
			release: () => this.releaseSemaphore(),
		});
	}

	private getWriteLockKey(
		domain: OpenClawTaskDomain,
		operation: OpenClawOperationType,
	): string | undefined {
		if (domain === 'calendar' && operation === 'write') {
			return `calendar-write:${this.calendarResourceId}`;
		}
		if (domain === 'email' && operation === 'write') {
			return `email-write:${this.emailResourceId}`;
		}
		return undefined;
	}

	private async acquireWriteLock(
		lockKey: string,
		taskId: string,
		threadId: string,
		domain: OpenClawTaskDomain,
		operation: OpenClawOperationType,
		onQueued?: (event: OpenClawQueueEvent) => void,
	): Promise<() => void> {
		const state = this.writeLocks.get(lockKey) ?? { queue: [] };
		this.writeLocks.set(lockKey, state);

		if (!state.holderTaskId) {
			state.holderTaskId = taskId;
			return () => this.releaseWriteLock(lockKey, taskId);
		}

		const createdAtMs = this.now();
		return new Promise<() => void>((resolve, reject) => {
			const waiter: LockWaiter = {
				taskId,
				createdAtMs,
				resolve,
				reject,
				warnTimer: setTimeout(() => {
					onQueued?.({
						stage: 'lock',
						taskId,
						threadId,
						domain,
						operation,
						waitMs: this.now() - createdAtMs,
						queueLength: state.queue.length,
						lockKey,
					});
				}, this.queueWarnMs),
				timeoutTimer: setTimeout(() => {
					const idx = state.queue.indexOf(waiter);
					if (idx >= 0) state.queue.splice(idx, 1);
					reject(
						new OpenClawTaskQueueTimeoutError('lock', this.now() - createdAtMs, state.queue.length),
					);
				}, this.queueTimeoutMs),
			};
			maybeUnref(waiter.warnTimer);
			maybeUnref(waiter.timeoutTimer);
			state.queue.push(waiter);
		});
	}

	private releaseWriteLock(lockKey: string, holderTaskId: string): void {
		const state = this.writeLocks.get(lockKey);
		if (!state) return;
		if (state.holderTaskId !== holderTaskId) return;

		const next = state.queue.shift();
		if (!next) {
			this.writeLocks.delete(lockKey);
			return;
		}

		clearTimeout(next.warnTimer);
		clearTimeout(next.timeoutTimer);
		state.holderTaskId = next.taskId;
		next.resolve(() => this.releaseWriteLock(lockKey, next.taskId));
	}

	private releaseTask(taskId: string, status: OpenClawTaskStatus): void {
		const task = this.tasks.get(taskId);
		if (!task || task.released) return;

		task.released = true;
		this.tasks.delete(taskId);

		try {
			task.releaseLock?.();
		} finally {
			task.releaseSlot();
		}

		const thread = this.threads.get(task.threadId);
		if (thread) {
			thread.activeTaskCount = Math.max(0, thread.activeTaskCount - 1);
			thread.lastUsedAtMs = this.now();
			thread.lastCompletedAtMs = this.now();
		}

		this.log(
			`task.released taskId=${taskId} threadId=${task.threadId} domain=${task.domain} operation=${task.operation} status=${status}`,
		);
		this.cleanupExpiredThreads(this.now());
	}

	private cleanupExpiredThreads(nowMs: number): void {
		for (const [threadId, thread] of this.threads) {
			if (thread.activeTaskCount > 0) continue;
			if (nowMs - thread.lastUsedAtMs > this.threadTtlMs) {
				this.threads.delete(threadId);
			}
		}
	}
}
