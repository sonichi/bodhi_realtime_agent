// SPDX-License-Identifier: MIT

import type { LanguageModelV1 } from 'ai';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { VoiceSession } from '../../src/core/voice-session.js';
import type { MainAgent } from '../../src/types/agent.js';

vi.mock('@google/genai', () => {
	let messageHandler: ((msg: unknown) => void) | null = null;
	return {
		GoogleGenAI: vi.fn().mockImplementation(() => ({
			live: {
				connect: vi.fn(async (params: Record<string, unknown>) => {
					const cbs = params.callbacks as Record<string, (...args: unknown[]) => void>;
					messageHandler = cbs.onmessage as (msg: unknown) => void;
					setTimeout(() => messageHandler?.({ setupComplete: { sessionId: 'gs_1' } }), 5);
					return {
						sendRealtimeInput: vi.fn(),
						sendToolResponse: vi.fn(),
						sendClientContent: vi.fn(),
						close: vi.fn(),
					};
				}),
			},
		})),
		_getMessageHandler: () => messageHandler,
	};
});

vi.mock('ai', () => ({
	generateText: vi.fn(async (opts: { onStepFinish?: (step: unknown) => void }) => {
		opts.onStepFinish?.({ toolCalls: [], usage: { totalTokens: 10 } });
		return { text: 'done' };
	}),
}));

const mockModel = { modelId: 'test-model' } as unknown as LanguageModelV1;
const echoAgent = (): MainAgent => ({ name: 'echo', instructions: 'echo', tools: [] });

describe('turn lifecycle ids', () => {
	let session: VoiceSession | null = null;
	afterEach(async () => {
		if (session) {
			await session.close();
			session = null;
		}
	});

	it('start, interrupted and end of ONE turn all carry the SAME id', async () => {
		// turn.start adds one and handleTurnComplete increments before publishing,
		// so both name the turn 1-based. handleInterrupted published the LIVE
		// counter, which is one behind — an interrupt and the end of the very same
		// turn reported different ids, and a consumer keying a per-turn record on
		// them could never join the two.
		//
		// The 1-based pairing is the contract turn.start established; this aligns
		// the third event to it rather than re-numbering the other two.
		session = new VoiceSession({
			sessionId: 'sess_ids',
			userId: 'u',
			apiKey: 'k',
			agents: [echoAgent()],
			initialAgent: 'echo',
			port: 9887,
			model: mockModel,
		});
		const starts: string[] = [];
		const interrupted: string[] = [];
		const ends: string[] = [];
		session.eventBus.subscribe('turn.start', (p) => starts.push(p.turnId));
		session.eventBus.subscribe('turn.interrupted', (p) => interrupted.push(p.turnId));
		session.eventBus.subscribe('turn.end', (p) => ends.push(p.turnId));

		await session.start();
		await new Promise((r) => setTimeout(r, 50));
		const { _getMessageHandler } = await import('@google/genai');
		const fire = (_getMessageHandler as unknown as () => (m: unknown) => void)();

		fire({
			serverContent: {
				modelTurn: { parts: [{ inlineData: { data: 'AAAA', mimeType: 'audio/pcm' } }] },
			},
		});
		await new Promise((r) => setTimeout(r, 20));
		fire({ serverContent: { interrupted: true } });
		await new Promise((r) => setTimeout(r, 20));
		fire({ serverContent: { turnComplete: true } });
		await new Promise((r) => setTimeout(r, 50));

		expect(starts).toEqual(['turn_1']);
		expect(ends).toEqual(['turn_1']);
		expect(interrupted).toEqual(['turn_1']); // was 'turn_0'
	});

	// ---- generation lifecycle -------------------------------------------------
	//
	// These assert a TRACE of the paired generation.start / generation.end
	// events, not a count. Counting is not enough: before the state machine,
	// `audio → turnComplete → toolCall → audio` also produced two starts, but as
	// one bogus start on the tool tail plus one real one, with the actual answer
	// credited to nothing. Same number, different composition.
	//
	// NOTE what is deliberately NOT asserted here: any drift between turn ids.
	// An earlier version of this file pinned turn.end/turn.interrupted reporting
	// DIFFERENT ids, to argue that generationId had to be independent of turnId.
	// That drift is fixed on main now, and generationId is independent for its
	// own reason — the two count different things.

	const AUDIO = {
		serverContent: {
			modelTurn: { parts: [{ inlineData: { data: 'AAAA', mimeType: 'audio/pcm' } }] },
		},
	};
	const TOOL_CALL = {
		toolCall: { functionCalls: [{ id: 'fc_1', name: 'get_weather', args: { city: 'Boston' } }] },
	};
	const TURN_COMPLETE = { serverContent: { turnComplete: true } };
	const GEN_COMPLETE = { serverContent: { generationComplete: true } };
	const INTERRUPTED = { serverContent: { interrupted: true } };

	async function lifecycleOf(
		port: number,
		sessionId: string,
		script: [string, unknown][],
	): Promise<{ openedOn: string[]; lifecycle: string[] }> {
		session = new VoiceSession({
			sessionId,
			userId: 'u',
			apiKey: 'k',
			agents: [echoAgent()],
			initialAgent: 'echo',
			port,
			model: mockModel,
		});
		const lifecycle: string[] = [];
		let opened = 0;
		session.eventBus.subscribe('generation.start', (p) => {
			opened++;
			lifecycle.push(`start:${p.generationId}`);
		});
		session.eventBus.subscribe('generation.end', (p) =>
			lifecycle.push(`end:${p.generationId}:${p.reason}`),
		);
		await session.start();
		await new Promise((r) => setTimeout(r, 50));

		const { _getMessageHandler } = await import('@google/genai');
		const fire = (_getMessageHandler as unknown as () => (m: unknown) => void)();
		const openedOn: string[] = [];
		for (const [label, msg] of script) {
			const before = opened;
			fire(msg);
			await new Promise((r) => setTimeout(r, 25));
			if (opened > before) openedOn.push(label);
		}
		await new Promise((r) => setTimeout(r, 40));
		return { openedOn, lifecycle };
	}

	it('a toolCall after turnComplete stays in the SAME generation', async () => {
		// The defect this exists for: turnComplete cleared the "a turn is
		// underway" boolean, so the tool call that finishes an answer was
		// relabelled the start of a new model turn — one answer, two candidates
		// downstream. Before: opened on ['audio', 'toolCall'].
		const { openedOn, lifecycle } = await lifecycleOf(9889, 'sess_tail', [
			['audio', AUDIO],
			['turnComplete', TURN_COMPLETE],
			['toolCall', TOOL_CALL],
		]);
		expect(openedOn).toEqual(['audio']);
		expect(lifecycle).toEqual(['start:gen_0']); // draining, not ended
	});

	it('the answer built from a tool result IS a new generation', async () => {
		// Identity surviving turnComplete must not swallow the next real answer.
		// Before, the count was also 2 — but as ['audio','toolCall'], crediting
		// the tool tail and missing the answer entirely.
		const { openedOn, lifecycle } = await lifecycleOf(9890, 'sess_answer', [
			['audio-1', AUDIO],
			['turnComplete', TURN_COMPLETE],
			['toolCall', TOOL_CALL],
			['audio-2', AUDIO],
		]);
		expect(openedOn).toEqual(['audio-1', 'audio-2']);
		expect(lifecycle).toEqual(['start:gen_0', 'end:gen_0:superseded', 'start:gen_1']);
	});

	it('generationComplete ends it; the next output opens a new one', async () => {
		const { lifecycle } = await lifecycleOf(9891, 'sess_gen_terminal', [
			['audio', AUDIO],
			['generationComplete', GEN_COMPLETE],
			['turnComplete', TURN_COMPLETE],
			['toolCall', TOOL_CALL],
		]);
		expect(lifecycle).toEqual(['start:gen_0', 'end:gen_0:generationComplete', 'start:gen_1']);
	});

	it('an interrupt ends the generation', async () => {
		const { lifecycle } = await lifecycleOf(9892, 'sess_interrupt', [
			['audio', AUDIO],
			['interrupted', INTERRUPTED],
			['toolCall', TOOL_CALL],
		]);
		expect(lifecycle).toEqual(['start:gen_0', 'end:gen_0:interrupted', 'start:gen_1']);
	});

	it('does not wedge when generationComplete never arrives', async () => {
		// The machine must not depend on generationComplete being reliable: I
		// have NOT verified that Gemini always sends it. Three plain turns with
		// only turnComplete must still be three generations, each closed.
		const { openedOn, lifecycle } = await lifecycleOf(9893, 'sess_no_gc', [
			['audio-1', AUDIO],
			['turnComplete-1', TURN_COMPLETE],
			['audio-2', AUDIO],
			['turnComplete-2', TURN_COMPLETE],
			['audio-3', AUDIO],
			['turnComplete-3', TURN_COMPLETE],
		]);
		expect(openedOn).toEqual(['audio-1', 'audio-2', 'audio-3']);
		expect(lifecycle).toEqual([
			'start:gen_0',
			'end:gen_0:superseded',
			'start:gen_1',
			'end:gen_1:superseded',
			'start:gen_2',
		]);
	});

	it('generationComplete reaches the transport callback', async () => {
		// Gemini sends it separately from turnComplete and only the latter was
		// read, so the finer boundary was invisible upstream. Surfaced only —
		// nothing in this change consumes it.
		session = new VoiceSession({
			sessionId: 'sess_gen',
			userId: 'u',
			apiKey: 'k',
			agents: [echoAgent()],
			initialAgent: 'echo',
			port: 9888,
			model: mockModel,
		});
		await session.start();
		await new Promise((r) => setTimeout(r, 50));

		let fired = 0;
		// WRAP, do not replace. Replacing the transport's own handler disables
		// whatever VoiceSession registered there, and a guard that silently stops
		// covering the site it guards is the kind nobody re-audits.
		// biome-ignore lint/suspicious/noExplicitAny: reaching the transport for a callback assertion
		const t = (session as any).transport as { onGenerationComplete?: () => void };
		const prev = t.onGenerationComplete;
		t.onGenerationComplete = () => {
			fired++;
			prev?.();
		};

		const { _getMessageHandler } = await import('@google/genai');
		const fire = (_getMessageHandler as unknown as () => (m: unknown) => void)();
		fire({ serverContent: { generationComplete: true } });
		await new Promise((r) => setTimeout(r, 30));

		expect(fired).toBe(1);
	});
});
