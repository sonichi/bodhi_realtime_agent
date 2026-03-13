# Design: Parallel OpenClaw Tasking (Up to 10 Concurrent Tasks)

## 1. Context

The current OpenClaw integration can run multiple `ask_openclaw` background calls at the same time.
However, all calls currently share a single OpenClaw `sessionKey` per voice session. This creates cross-task interference when different tasks overlap (calendar + email/newsletter, etc.).

Observed failure pattern:

1. Task A is still running on OpenClaw.
2. Task B starts with the same `sessionKey`.
3. Task B may complete with empty text (or receive wrong turn context).
4. Relay reports an error (`OpenClaw completed with empty response text`) even though a later retry may succeed.

## 2. Decisions From Review

This design explicitly adopts the following constraints:

1. Keep framework API unchanged.
   - Do not change `SubagentConfig.createInstance` signature.
   - Keep OpenClaw-specific logic inside `examples/openclaw/`.
2. Do not rely on model-supplied `resourceTags`.
   - Infer domains and lock keys server-side from task/message text.
3. Treat `threadId` as optional hint, not required.
   - Heuristic thread resolution is the primary path.
4. Merge core concurrency work.
   - Build task manager and per-handoff isolation together.
5. Add queue/backpressure user feedback.
   - Surface queued and timeout states to the user.

## 3. Goals

1. Support true parallel multitasking for a bounded workload (`<= 10` concurrent OpenClaw tasks).
2. Keep task contexts isolated so one task cannot consume another task's session state.
3. Preserve continuity for follow-ups (for example, calendar confirmations).
4. Avoid harmful concurrent write conflicts on mutable resources.
5. Improve observability and failure recovery.

## 4. Non-Goals

1. Unlimited concurrency.
2. Distributed scheduling across multiple processes.
3. Perfect natural-language follow-up mapping in all cases.

## 5. Architecture

### 5.1 Core Components

1. `OpenClawTaskManager`
2. `ThreadRegistry`
3. `ConcurrencyLimiter` (semaphore, max 10)
4. `WriteLockManager` (write-only keyed locks)

### 5.2 Isolation Model

1. Execution task: one background tool invocation.
2. Task thread: continuity group used by follow-ups.
3. OpenClaw session key: one per thread, not one per voice session.

Session key format:

`bodhi:<voiceSessionId>:thread:<threadId>`

### 5.3 Framework Boundary

No framework API changes are required.

1. Keep `SubagentConfig.createInstance?: () => SubagentConfig` unchanged.
2. Return a fresh subagent config per handoff using existing `createInstance`.
3. Keep per-task state in closure variables inside that instance.
4. Resolve thread/session/locks inside `openclaw_chat.execute(...)` (execution-time), not in framework-level factory signatures.

This avoids leaking OpenClaw concerns into `src/types/agent.ts`.

### 5.4 Concurrency and Backpressure

1. `OpenClawTaskManager` uses a semaphore (`maxConcurrent = 10`).
2. Queue wait threshold: if wait exceeds 2 seconds, emit a queued notification callback.
3. Max queue wait timeout: 30 seconds.
4. On timeout, return a user-facing failure state:
   - "All my background agents are busy right now. Please retry in a moment."

Queue notifications are integrated with background notification delivery so voice users hear that work is queued rather than silently blocked.

### 5.5 Locking Strategy (Narrow, Write-Only)

Server infers operation type from text and applies only write locks.

1. Read operations (calendar lookup, search, summarize) do not lock.
2. Calendar writes lock on `calendar-write:<account>`.
3. Email send does not lock in V1 unless we observe real collision issues.
4. Lock scope is minimal and domain-specific.

This avoids over-serializing unrelated tasks.

## 6. Thread Resolution (Heuristic-First)

Primary path is heuristic resolution without requiring model-passed IDs.

Inputs:

1. Current task message.
2. Active and recently completed task metadata.
3. Optional explicit thread hint (if available).

Resolution algorithm:

1. Classify domain from message (`calendar`, `email`, `coding`, `research`, `other`).
2. Find candidate thread by:
   - matching active thread with same domain, else
   - most recent completed thread with same domain in a 60 second window.
3. If exactly one candidate, reuse it.
4. If ambiguous or none, create a new thread.
5. If explicit thread hint is present and valid, prefer it.

`threadId` remains an optimization hint, not a required contract.

## 7. API and Contract Changes

### 7.1 `ask_openclaw` Tool Schema

Keep schema unchanged for now:

`{ task: string }`

No `resourceTags` field.

Optional `threadId` can be added later as non-required hint for non-voice clients, but the resolver must work without it.

### 7.2 Pending/Progress Contract

Pending message remains immediate (`still_in_progress`), plus queue-aware system notifications when capacity is saturated.

Progress/queue events should include:

1. `taskId`
2. `threadId`
3. queue position (if known)

## 8. Detailed Flow

1. Main LLM calls `ask_openclaw` (background).
2. `ToolCallRouter` sends immediate pending response.
3. Subagent handoff starts with a fresh config instance (`createInstance()`).
4. `openclaw_chat.execute` asks `OpenClawTaskManager` for:
   - execution slot (semaphore)
   - resolved thread/session key
   - write lock lease if operation is mutating
5. If queued for too long, queue callback notifies user.
6. On slot granted, run `chatSend(sessionKey, message)` and stream events.
7. On terminal result, release lock and semaphore in `finally`.
8. Retry once on `completed + empty text` before surfacing error.

## 9. Observability

Emit structured logs/events:

1. `openclaw.task.started` with `taskId`, `threadId`, `sessionKey`, `domain`, `opType`.
2. `openclaw.task.queued` with `queueMs` and optional `position`.
3. `openclaw.task.timeout` when queue wait exceeds 30 seconds.
4. `openclaw.task.completed` / `failed` / `retried`.
5. `openclaw.thread.resolved` with reason (`hint`, `heuristic_active`, `heuristic_recent`, `new`).

## 10. Execution Plan

## Phase 0: Safety Net (Standalone)

1. Keep existing empty-text guard.
2. Add one retry for `completed + empty text`.
3. Add run correlation logs (`taskId`, `threadId`, `sessionKey`, `runId`).
4. Add tests for retry behavior.

Target files:

1. `examples/openclaw/lib/openclaw-tools.ts`
2. `examples/openclaw/lib/openclaw-client.ts`
3. `test/app/openclaw-tools.test.ts`

## Phase 1: Core Parallelism (Merged Task Manager + Per-Handoff Instances)

1. Add `OpenClawTaskManager`:
   - semaphore max 10
   - queue timeout and callbacks
   - thread registry and TTL cleanup
   - server-side domain/op inference
   - write-lock management
2. Wire manager into OpenClaw subagent config.
3. Use existing no-arg `createInstance()` to return fresh closure state per handoff.
4. Resolve session key and lock lease inside `openclaw_chat.execute`.
5. Ensure release in `finally` via `dispose` and execution guards.
6. Add tests for same-turn concurrent handoffs.

Target files:

1. `examples/openclaw/lib/openclaw-task-manager.ts`
2. `examples/openclaw/lib/openclaw-tools.ts`
3. `examples/openclaw/openclaw-demo.ts`
4. `test/app/openclaw-task-manager.test.ts`
5. `test/app/openclaw-tools.test.ts`

## Phase 2: Heuristic-First Thread Continuity

1. Implement thread resolver with active/recent domain matching.
2. Add 60 second recency window for implicit follow-ups.
3. Keep explicit thread hint support optional.
4. Add tests for follow-up mapping without `threadId`.

Target files:

1. `examples/openclaw/lib/openclaw-thread-resolver.ts` (or integrated into task manager)
2. `examples/openclaw/lib/openclaw-tools.ts`
3. `test/app/openclaw-task-manager.test.ts`

## Phase 3: Optional Framework Changes (Only If Proven Necessary)

Do not implement by default.

If phase 1 and phase 2 reveal hard limitations, evaluate minimal framework extension separately with evidence.

## 11. Testing Strategy (Alongside Phases)

1. Unit tests for semaphore limits and queue timeout.
2. Unit tests for write-lock behavior (calendar-write serialized, reads parallel).
3. Unit tests for thread resolver (heuristic-first, no hint).
4. Integration tests:
   - calendar and newsletter in parallel
   - confirmation follow-up while newsletter is in flight
   - no false empty-response error under overlap
5. Regression tests for existing interactive `ask_user` flows.

## 12. Acceptance Criteria

1. Up to 10 concurrent `ask_openclaw` tasks execute without session cross-talk.
2. Calendar + newsletter overlap no longer produces false "empty response" failures.
3. Confirmation follow-up resolves to the expected calendar thread without requiring `threadId`.
4. Read-only calendar checks can run in parallel.
5. Queue saturation produces explicit user-facing queued/timeout feedback.

## 13. Risks and Mitigations

1. Risk: heuristic thread mapping picks wrong thread in ambiguous domains.
   - Mitigation: recency window + ambiguity fallback to new thread + structured logs.
2. Risk: queue delay degrades user trust.
   - Mitigation: queued voice notification and 30 second timeout.
3. Risk: stale thread metadata growth.
   - Mitigation: TTL cleanup and cap on retained recent threads.
4. Risk: lock policy too broad or too narrow.
   - Mitigation: start with write-only calendar locks and tune from telemetry.

## 14. Concrete Work Breakdown

1. Implement phase 0 retry and logging.
2. Add phase 0 tests.
3. Implement `OpenClawTaskManager` (semaphore, queue callbacks, timeout).
4. Implement server-side domain/op inference.
5. Implement write-only lock manager.
6. Wire manager into OpenClaw config and per-handoff instance creation.
7. Move thread/session acquisition into `openclaw_chat.execute`.
8. Add queue feedback notification plumbing.
9. Add same-turn concurrent handoff tests.
10. Implement heuristic-first resolver (active/recent, 60s window).
11. Add follow-up continuity tests without thread hints.
12. Run targeted and integration test suites; validate with manual voice demo.
