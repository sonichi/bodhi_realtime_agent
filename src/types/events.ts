// SPDX-License-Identifier: MIT

import type { ExternalEvent } from './agent.js';
import type { SubagentResult, ToolCall, ToolResult, UIPayload } from './conversation.js';
import type { SessionState } from './session.js';
import type { UIResponse } from './ui.js';

/** Function returned by EventBus.subscribe() — call it to remove the subscription. */
export type Unsubscribe = () => void;

/**
 * Maps each event type string to its payload shape.
 * EventBus uses this mapped type for compile-time type safety on publish/subscribe.
 *
 * @example
 * ```ts
 * eventBus.subscribe('agent.transfer', (payload) => {
 *   // payload is typed as { sessionId: string; fromAgent: string; toAgent: string }
 * });
 * ```
 */
export interface EventPayloadMap {
	// Agent events
	'agent.enter': { sessionId: string; agentName: string };
	'agent.exit': { sessionId: string; agentName: string };
	'agent.transfer': { sessionId: string; fromAgent: string; toAgent: string };
	'agent.handoff': {
		sessionId: string;
		agentName: string;
		subagentName: string;
		toolCallId: string;
	};

	// Tool events
	'tool.call': ToolCall & { sessionId: string; agentName: string };
	'tool.result': ToolResult & { sessionId: string };
	'tool.cancel': { sessionId: string; toolCallIds: string[] };

	// Turn events
	// transportGeneration is the POST-SETUP counter (correlates with lifecycle
	// setup-ok); attemptEpoch is the DIAL counter recoverUpstream returns.
	'turn.start': {
		sessionId: string;
		turnId: string;
		transportGeneration?: number;
		attemptEpoch?: number;
	};
	'session.reconnectBoundary': { sessionId: string; reason: string; transportGeneration: number };
	'turn.end': { sessionId: string; turnId: string };
	'turn.interrupted': { sessionId: string; turnId: string };

	// Generation lifecycle — a PAIR, and a different boundary from the three
	// above. Those observe the Gemini protocol: turn.end is turnComplete and
	// nothing more. A generation outlives turnComplete, because the tool call
	// that finishes an answer arrives after it. A consumer building per-answer
	// state must key on these, not on turn.*, or it closes its candidate
	// before the tail arrives.
	//
	// generationId is the transport's own counter, deliberately not turnId:
	// the two count different things, and a generation still draining would
	// otherwise report its end under the next turn's id.
	'generation.start': { sessionId: string; generationId: string };
	'generation.end': {
		sessionId: string;
		generationId: string;
		/**
		 * generationComplete — the provider said so.
		 * interrupted        — barged in on.
		 * superseded         — the model began speaking again without ever
		 *                      sending generationComplete.
		 * disconnected       — the session went away with one open.
		 */
		reason: 'generationComplete' | 'interrupted' | 'superseded' | 'disconnected';
	};

	// GUI events
	'gui.update': { sessionId: string; data: Record<string, unknown> };
	'gui.notification': { sessionId: string; message: string };

	// Session events
	'session.start': { sessionId: string; userId: string; agentName: string };
	'session.close': { sessionId: string; reason: string };
	'session.stateChange': {
		sessionId: string;
		fromState: SessionState;
		toState: SessionState;
	};
	'session.resume': { sessionId: string; handle: string };
	'session.goaway': { sessionId: string; timeLeft: string };
	'context.compact': { sessionId: string; removedItems: number };

	// Subagent interaction events (Patterns 2 & 3)
	'subagent.ui.send': { sessionId: string; payload: UIPayload };
	'subagent.ui.response': { sessionId: string; response: UIResponse };
	'subagent.notification': {
		sessionId: string;
		result: SubagentResult;
		event: ExternalEvent;
	};
}

/** Union of all valid event type strings (e.g. "agent.enter", "tool.call"). */
export type EventType = keyof EventPayloadMap;

/** Resolves the payload type for a given event type string. */
export type EventPayload<T extends EventType> = EventPayloadMap[T];
