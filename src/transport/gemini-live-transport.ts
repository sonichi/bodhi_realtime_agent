// SPDX-License-Identifier: MIT

import {
	GoogleGenAI,
	type LiveServerMessage,
	type MediaResolution,
	type Session,
	type UsageMetadata,
} from '@google/genai';
import { DEFAULT_CONNECT_TIMEOUT_MS, DEFAULT_RECONNECT_TIMEOUT_MS } from '../core/constants.js';
import type { ToolDefinition } from '../types/tool.js';
import type {
	AudioFormatSpec,
	ConnectionLifecycleEvent,
	ContentTurn,
	GenerationEndReason,
	LLMTransport,
	LLMTransportConfig,
	LLMTransportError,
	ReconnectState,
	ReplayItem,
	SessionUpdate,
	TransportCapabilities,
	TransportDiagnostics,
	TransportToolCall,
	TransportToolResult,
	TransportUsageMetadata,
	UpstreamCounters,
	UpstreamSlotCounters,
} from '../types/transport.js';
import { zodToJsonSchema } from './zod-to-schema.js';

/** Configuration for connecting to the Gemini Live API. */
export interface GeminiTransportConfig {
	/** Google API key for authentication. */
	apiKey: string;
	/** Gemini model name (default: "gemini-live-2.5-flash-preview"). */
	model?: string;
	/** System instruction sent to the model at connection time. */
	systemInstruction?: string;
	/** Tool definitions to register with the model (converted to Gemini function declarations). */
	tools?: ToolDefinition[];
	/** Opaque handle from a previous session, used to resume an existing Gemini session. */
	resumptionHandle?: string;
	/** Voice configuration for Gemini's speech synthesis. */
	speechConfig?: { voiceName?: string };
	/** Context window compression settings (trigger and target token counts). */
	/** Context-window compression. Supply the object with NO thresholds to enable
	 *  it with the server's defaults (trigger 80% of the model limit, target half). */
	compressionConfig?: { triggerTokens?: number; targetTokens?: number };
	/** Session-wide media token cost for video/image input. LOW = 64 tokens per
	 *  frame. Applies to every REALTIME-INPUT image this transport sends —
	 *  realtime input has no per-send override. (Client-content Parts do, via
	 *  Part.mediaResolution, but this transport sends images as realtime input.) */
	mediaResolution?: 'MEDIA_RESOLUTION_LOW' | 'MEDIA_RESOLUTION_MEDIUM' | 'MEDIA_RESOLUTION_HIGH';
	/** Enable Gemini's built-in Google Search grounding. */
	googleSearch?: boolean;
	/** Enable server-side transcription of user audio input (default: true). */
	inputAudioTranscription?: boolean;
	/** Timeout in ms for connect() to receive setupComplete (default: 30000). */
	connectTimeoutMs?: number;
	/** Timeout in ms for the overall reconnect operation (default: 45000). */
	reconnectTimeoutMs?: number;
	/** Gemini automatic-VAD tuning — passed through as
	 *  realtimeInputConfig.automaticActivityDetection. Lets the caller shorten
	 *  silenceDurationMs so end-of-speech (turn end) is detected faster. */
	vadConfig?: {
		disabled?: boolean;
		startOfSpeechSensitivity?: string;
		endOfSpeechSensitivity?: string;
		prefixPaddingMs?: number;
		silenceDurationMs?: number;
	};
}

/** Callbacks fired by GeminiLiveTransport when server messages arrive. */
/** Token accounting as reported by the Live server.
 *
 * Aliases the SDK's own schema so every field the server sends stays reachable
 * — a hand-written subset would silently hide cache and tool-use counts.
 * `promptTokenCount` is the standing prompt size, the field to watch for context
 * growth; `totalTokenCount` adds response tokens and so does not describe it. */
export type LiveUsageMetadata = UsageMetadata;

export interface GeminiTransportCallbacks {
	/** Gemini session setup is complete and ready for audio. */
	onSetupComplete?(sessionId: string): void;
	/** Base64-encoded PCM audio output from the model. */
	onAudioOutput?(data: string): void;
	/** Model is requesting one or more tool invocations. */
	onToolCall?(calls: Array<{ id: string; name: string; args: Record<string, unknown> }>): void;
	/** Model is cancelling previously requested tool calls. */
	onToolCallCancellation?(ids: string[]): void;
	/** Model has finished its response turn. */
	onTurnComplete?(): void;
	/** Model's response was interrupted by user speech. */
	onInterrupted?(): void;
	/** Model started a new response turn (first audio or tool call). */
	onModelTurnStart?(generationId?: string): void;
	/** A generation opened. Paired with onGenerationEnd; see events.ts. */
	onGenerationStart?(generationId: string): void;
	/** That generation closed, and why. Fires exactly once per start. */
	onGenerationEnd?(generationId: string, reason: GenerationEndReason): void;
	/** The model finished generating. Distinct from turnComplete. */
	onGenerationComplete?(): void;
	/** Transcription of user's spoken input. */
	onInputTranscription?(text: string): void;
	/** Transcription of model's spoken output. */
	onOutputTranscription?(text: string): void;
	/** Server is shutting down — reconnect before timeLeft expires. */
	onGoAway?(timeLeft: string): void;
	/** New session resumption handle available. */
	onResumptionUpdate?(handle: string, resumable: boolean): void;
	/** Connection-lifecycle facts (attempt / setup / close). */
	onConnectionLifecycle?(event: ConnectionLifecycleEvent): void;
	/** Server-reported token accounting. Fires on EVERY message carrying it,
	 *  including ones that also carry serverContent, a tool call, or goAway. */
	onUsageMetadata?(usage: LiveUsageMetadata): void;
	/** Grounding metadata from Google Search results. */
	onGroundingMetadata?(metadata: Record<string, unknown>): void;
	/** Transport-level error. */
	onError?(error: Error): void;
	/** WebSocket connection closed. */
	onClose?(code?: number, reason?: string): void;
}

/**
 * WebSocket transport layer for the Gemini Live API.
 *
 * Wraps the `@google/genai` SDK's live.connect() to manage the bidirectional
 * audio stream. Handles connection setup, message routing, tool declaration
 * conversion (Zod → JSON Schema), and session resumption.
 *
 * Implements `LLMTransport` for provider-agnostic usage. The constructor
 * callback pattern is preserved for backward compatibility alongside the
 * LLMTransport callback properties.
 */
function freshSlot(): UpstreamSlotCounters {
	return {
		attempted: 0,
		queued: 0,
		skippedNoSession: 0,
		threw: 0,
		attemptedRawBytes: 0,
		queuedRawBytes: 0,
		attemptedWireBytesEstimate: 0,
		queuedWireBytesEstimate: 0,
		lastAttemptedAt: null,
		lastQueuedAt: null,
		lastSkippedAt: null,
		lastThrewAt: null,
	};
}

function freshUpstreamCounters(): UpstreamCounters {
	return {
		audio: freshSlot(),
		video: { ...freshSlot(), unsupportedMime: 0 },
		text: { ...freshSlot(), skippedEmpty: 0 },
	};
}

export class GeminiLiveTransport implements LLMTransport {
	private session: Session | null = null;
	private ai: GoogleGenAI;
	private callbacks: GeminiTransportCallbacks;
	private config: GeminiTransportConfig;
	/** Resolves when setupComplete fires — used to make connect() await Gemini readiness. */
	private setupResolver: (() => void) | null = null;
	/** Increments per dial; callbacks capture their dial's value so a
	 *  superseded dial's socket events never reach the live handlers. */
	private dialGen = 0;
	private transportGeneration = 0;
	private upstream: UpstreamCounters = freshUpstreamCounters();
	private currentAttemptId = '';
	private currentAttemptSetupDone = false;
	private closeEmittedFor = '';

	/** Property form — VoiceSession wires these, not the constructor callbacks. */
	onConnectionLifecycle?: (event: ConnectionLifecycleEvent) => void;

	/** Run an observer without letting its failure reach the state machine. A
	 *  throwing attempt observer must not prevent dialing; a throwing setup-ok
	 *  observer must not fake a timeout; a throwing close observer must not
	 *  keep disconnect() from closing the socket. */
	private notifyLifecycleObserver(fn: () => void): void {
		try {
			fn();
		} catch (err) {
			console.warn(
				'[GeminiLiveTransport] onConnectionLifecycle observer threw; lifecycle continues:',
				err,
			);
		}
	}

	private emitLifecycle(event: ConnectionLifecycleEvent): void {
		this.notifyLifecycleObserver(() => this.callbacks.onConnectionLifecycle?.(event));
		this.notifyLifecycleObserver(() => this.onConnectionLifecycle?.(event));
	}
	/** Tracks whether onModelTurnStart has already fired for the current turn. */
	/**
	 * Where the current generation is. A generation is the unit a consumer
	 * builds per-answer state on; it is NOT a Gemini turn.
	 *
	 *   idle            --modelTurn|toolCall-->  active
	 *   active          --turnComplete------->   draining   (identity survives)
	 *   active|draining --generationComplete-->  terminal
	 *   active|draining --interrupted-------->   terminal
	 *   draining        --modelTurn---------->   active     (NEW generation)
	 *   terminal        --modelTurn|toolCall-->  active     (NEW generation)
	 *
	 * turnComplete used to clear a boolean here, so a tool call arriving after
	 * it was necessarily relabelled the start of a new model turn even when it
	 * was this generation's own tail. Only provider events move this — nothing
	 * times or gaps a boundary.
	 */
	private _genState: 'idle' | 'active' | 'draining' | 'terminal' = 'idle';
	/** Identity of that generation. Its own counter, not the session's turnId. */
	private _genSeq = 0;
	private _genId = 'gen_0';

	// --- LLMTransport static properties ---

	readonly capabilities: TransportCapabilities = {
		messageTruncation: false,
		turnDetection: true,
		userTranscription: true,
		inPlaceSessionUpdate: false,
		sessionResumption: true,
		contextCompression: true,
		groundingMetadata: true,
	};

	readonly audioFormat: AudioFormatSpec = {
		inputSampleRate: 16000,
		outputSampleRate: 24000,
		channels: 1,
		bitDepth: 16,
		encoding: 'pcm',
	};

	// --- LLMTransport callback properties ---

	onAudioOutput?: (base64Data: string) => void;
	onToolCall?: (calls: TransportToolCall[]) => void;
	onToolCallCancel?: (ids: string[]) => void;
	onTurnComplete?: () => void;
	onInterrupted?: () => void;
	onInputTranscription?: (text: string) => void;
	onOutputTranscription?: (text: string) => void;
	onSessionReady?: (sessionId: string) => void;
	onError?: (error: LLMTransportError) => void;
	onClose?: (code?: number, reason?: string) => void;
	onModelTurnStart?: (generationId?: string) => void;
	onGenerationStart?: (generationId: string) => void;
	onGenerationEnd?: (generationId: string, reason: GenerationEndReason) => void;
	onGenerationComplete?: () => void;
	onGoAway?: (timeLeft: string) => void;
	/** Property form — VoiceSession wires these, not the constructor callbacks.
	 *  Typed to the neutral shape so it satisfies LLMTransport; the object passed
	 *  is the full provider payload, castable to LiveUsageMetadata. */
	onUsageMetadata?: (usage: TransportUsageMetadata) => void;
	onResumptionUpdate?: (handle: string, resumable: boolean) => void;
	onGroundingMetadata?: (metadata: Record<string, unknown>) => void;

	constructor(config: GeminiTransportConfig, callbacks: GeminiTransportCallbacks) {
		this.ai = new GoogleGenAI({ apiKey: config.apiKey });
		this.config = config;
		this.callbacks = callbacks;
	}

	/** Establish a WebSocket connection to the Gemini Live API.
	 *  Resolves only after Gemini sends `setupComplete`, so callers can safely
	 *  send content immediately after awaiting this method.
	 *
	 *  Also satisfies `LLMTransport.connect(config)` — if config is provided,
	 *  it is applied before connecting.
	 */
	async connect(transportConfig?: LLMTransportConfig): Promise<void> {
		if (transportConfig) {
			this.applyTransportConfig(transportConfig);
		}

		const setupComplete = new Promise<void>((resolve) => {
			this.setupResolver = resolve;
		});

		const model = this.config.model ?? 'gemini-live-2.5-flash-preview';

		const connectConfig: Record<string, unknown> = {
			responseModalities: ['AUDIO'],
			outputAudioTranscription: {},
		};

		if (this.config.inputAudioTranscription !== false) {
			connectConfig.inputAudioTranscription = {};
		}

		if (this.config.systemInstruction) {
			connectConfig.systemInstruction = this.config.systemInstruction;
		}

		const toolEntries: Record<string, unknown>[] = [];
		if (this.config.googleSearch) {
			toolEntries.push({ googleSearch: {} });
		}
		if (this.config.tools?.length) {
			toolEntries.push({ functionDeclarations: this.config.tools.map(toolToDeclaration) });
		}
		if (toolEntries.length > 0) {
			connectConfig.tools = toolEntries;
		}

		if (this.config.resumptionHandle) {
			connectConfig.sessionResumption = { handle: this.config.resumptionHandle };
		} else {
			connectConfig.sessionResumption = {};
		}

		if (this.config.speechConfig?.voiceName) {
			connectConfig.speechConfig = {
				voiceConfig: { prebuiltVoiceConfig: { voiceName: this.config.speechConfig.voiceName } },
			};
		}

		if (this.config.compressionConfig) {
			// The API types both thresholds as int64-over-JSON, i.e. strings, and
			// omits => server default. Sending `undefined` would not be omission.
			const { triggerTokens, targetTokens } = this.config.compressionConfig;
			const compression: { triggerTokens?: string; slidingWindow: { targetTokens?: string } } = {
				slidingWindow: {},
			};
			if (triggerTokens !== undefined) compression.triggerTokens = String(triggerTokens);
			if (targetTokens !== undefined) compression.slidingWindow.targetTokens = String(targetTokens);
			connectConfig.contextWindowCompression = compression;
		}

		if (this.config.mediaResolution) {
			connectConfig.mediaResolution = this.config.mediaResolution as MediaResolution;
		}

		if (this.config.vadConfig) {
			connectConfig.realtimeInputConfig = {
				automaticActivityDetection: this.config.vadConfig,
			};
		}

		const timeoutMs = this.config.connectTimeoutMs ?? DEFAULT_CONNECT_TIMEOUT_MS;
		let timer: ReturnType<typeof setTimeout> | undefined;
		const timeout = new Promise<never>((_, reject) => {
			timer = setTimeout(
				() => reject(new Error(`Gemini connect timed out after ${timeoutMs}ms`)),
				timeoutMs,
			);
		});

		// The SDK's connect promise is resolve-only: on a failed dial (DNS
		// failure, refused socket) it never settles — the deadline must cover
		// the dial itself, not just the setupComplete wait.
		const gen = ++this.dialGen;
		this.currentAttemptId = `att_${gen}`;
		this.currentAttemptSetupDone = false;
		this.emitLifecycle({
			kind: 'attempt',
			connectAttemptId: this.currentAttemptId,
			handleSupplied: Boolean(this.config.resumptionHandle),
		});
		const dial = this.ai.live.connect({
			model,
			config: connectConfig,
			callbacks: {
				onopen: () => {},
				onmessage: (msg: LiveServerMessage) => {
					if (gen !== this.dialGen) return;
					this.handleMessage(msg);
				},
				onerror: (e: { message?: string }) => {
					if (gen !== this.dialGen) return;
					const error = new Error(e.message ?? 'WebSocket error');
					this.callbacks.onError?.(error);
					if (this.onError) this.onError({ error, recoverable: true });
				},
				onclose: (e: { code?: number; reason?: string }) => {
					if (gen !== this.dialGen) return;
					const code = e?.code;
					const reason = e?.reason;
					// A socket that dies before setupComplete has no generation —
					// that is the setup-failure evidence these events preserve.
					if (this.closeEmittedFor !== this.currentAttemptId) {
						this.closeEmittedFor = this.currentAttemptId;
						this.emitLifecycle(
							this.currentAttemptSetupDone
								? {
										kind: 'generation-close',
										connectAttemptId: this.currentAttemptId,
										transportGeneration: this.transportGeneration,
										code,
										reason,
									}
								: { kind: 'attempt-close', connectAttemptId: this.currentAttemptId, code, reason },
						);
					}
					this.callbacks.onClose?.(code, reason);
					if (this.onClose) this.onClose(code, reason);
				},
			},
		});

		try {
			this.session = await Promise.race([dial, timeout]);
			await Promise.race([setupComplete, timeout]);
		} catch (err) {
			// Same fencing as every other stale-dial signal: a superseded dial's
			// late failure is dead — emitting it would follow a newer attempt's
			// setup-ok with a stale setup-failed.
			if (gen === this.dialGen) {
				this.emitLifecycle({
					kind: 'setup-failed',
					connectAttemptId: `att_${gen}`,
					reason: err instanceof Error ? err.message : String(err),
				});
				this.dialGen++;
			}
			// Abandoned dial: strand its callbacks immediately, and close the
			// socket if it still opens later — a stale close must never reach
			// the live handlers as if it were the current connection's.
			dial.then((s) => s?.close?.()).catch(() => {});
			throw err;
		} finally {
			clearTimeout(timer);
		}
	}

	/** Disconnect and reconnect, optionally with a new resumption handle or ReconnectState.
	 *  Accepts either a string handle (legacy API) or ReconnectState (LLMTransport API).
	 */
	async reconnect(stateOrHandle?: ReconnectState | string): Promise<void> {
		const timeoutMs = this.config.reconnectTimeoutMs ?? DEFAULT_RECONNECT_TIMEOUT_MS;
		// Generation-fenced force-kill: if a recovery replaced the session while
		// this timer was pending, nulling would kill the replacement instead.
		const timerGen = this.dialGen;
		const timer = setTimeout(() => {
			if (this.dialGen === timerGen) this.session = null;
		}, timeoutMs);

		try {
			await this.disconnect();

			// Accept either a handle string (legacy) or ReconnectState (LLMTransport)
			if (typeof stateOrHandle === 'string') {
				this.config.resumptionHandle = stateOrHandle;
			}
			// When ReconnectState, the internal resumption handle is already stored
			// from onResumptionUpdate. conversationHistory replay happens after reconnect.

			await this.connect();

			// If ReconnectState with conversation history, replay it
			if (typeof stateOrHandle === 'object' && stateOrHandle?.conversationHistory?.length) {
				this.replayHistory(stateOrHandle.conversationHistory);
			}
		} finally {
			clearTimeout(timer);
		}
	}

	get currentDialGen(): number {
		return this.dialGen;
	}

	/** The post-setup generation counter — the one lifecycle setup-ok and
	 *  generation-close events carry. Distinct from the dial counter, which
	 *  also advances on failed and aborted dials. */
	get currentTransportGeneration(): number {
		return this.transportGeneration;
	}

	/** Synchronously strand the incumbent connection: bump the dial generation
	 *  (its callbacks go stale immediately — no state write can land later),
	 *  detach the session object BEFORE any await so a late-resolving close can
	 *  never null a replacement, and discard the resumption handle — a recovery
	 *  redial must never resume the wedged server-side turn. Returns the
	 *  bounded async cleanup: 'closed' when close() completed, 'forced' on
	 *  timeout or close error. */
	abortIncumbent(): Promise<'closed' | 'forced'> {
		this.dialGen += 1;
		const incumbent = this.session;
		this.session = null;
		this.endGeneration('disconnected');
		this._genState = 'idle';
		this.config.resumptionHandle = undefined;
		if (!incumbent) return Promise.resolve('closed');
		return new Promise((resolve) => {
			const deadline = setTimeout(() => resolve('forced'), 5_000);
			void Promise.resolve()
				.then(() => incumbent.close())
				.then(
					() => {
						clearTimeout(deadline);
						resolve('closed');
					},
					() => {
						clearTimeout(deadline);
						resolve('forced');
					},
				);
		});
	}

	/**
	 * Open a generation if provider output means a NEW one has begun.
	 *
	 * `audioOpensNew` is the one asymmetry: from `draining`, a tool call is this
	 * generation's tail, but model audio cannot be — the model speaking again is
	 * a new answer. That rule is what keeps the machine from wedging if
	 * generationComplete never arrives.
	 */
	private beginGenerationIfNew(audioOpensNew: boolean): void {
		if (this._genState === 'active') return;
		if (this._genState === 'draining' && !audioOpensNew) return;
		if (this._genState === 'draining') this.endGeneration('superseded');
		this._genState = 'active';
		this._genId = `gen_${this._genSeq}`;
		this.callbacks.onModelTurnStart?.(this._genId);
		if (this.onModelTurnStart) this.onModelTurnStart(this._genId);
		this.callbacks.onGenerationStart?.(this._genId);
		if (this.onGenerationStart) this.onGenerationStart(this._genId);
	}

	/** The single exit, so every terminal reason fires exactly one end. */
	private endGeneration(reason: GenerationEndReason): void {
		if (this._genState !== 'active' && this._genState !== 'draining') return;
		this._genState = 'terminal';
		const id = this._genId;
		this._genSeq++;
		this.callbacks.onGenerationEnd?.(id, reason);
		if (this.onGenerationEnd) this.onGenerationEnd(id, reason);
	}

	async disconnect(): Promise<void> {
		this.endGeneration('disconnected');
		this._genState = 'idle';
		// Capture the incumbent before awaiting: a recovery can replace
		// this.session while close() is in flight, and the replacement must
		// survive this call untouched.
		const incumbent = this.session;
		if (incumbent) {
			// The websocket's own onclose usually lands after the next dial has
			// bumped the fence, so a locally initiated close would never emit.
			// Emit deterministically here; the flag suppresses a late duplicate.
			if (this.currentAttemptSetupDone && this.closeEmittedFor !== this.currentAttemptId) {
				this.closeEmittedFor = this.currentAttemptId;
				this.emitLifecycle({
					kind: 'generation-close',
					connectAttemptId: this.currentAttemptId,
					transportGeneration: this.transportGeneration,
					code: 1000,
					reason: 'local disconnect',
				});
			}
			try {
				await incumbent.close();
			} catch {
				// Ignore close errors
			}
			if (this.session === incumbent) this.session = null;
		}
	}

	private noteAttempt(slot: UpstreamSlotCounters, rawBytes: number, wireBytes: number): void {
		slot.attempted++;
		slot.attemptedRawBytes += rawBytes;
		slot.attemptedWireBytesEstimate += wireBytes;
		slot.lastAttemptedAt = Date.now();
	}

	private noteSkip(slot: UpstreamSlotCounters, bump: () => void): void {
		bump();
		slot.lastSkippedAt = Date.now();
	}

	/** Runs the send; `queued` advances only on normal return. Exceptions are
	 *  counted and RETHROWN — instrumentation must not change error behavior. */
	private sendTracked(
		slot: UpstreamSlotCounters,
		rawBytes: number,
		wireBytes: number,
		send: () => void,
	): void {
		try {
			send();
		} catch (err) {
			slot.threw++;
			slot.lastThrewAt = Date.now();
			throw err;
		}
		slot.queued++;
		slot.queuedRawBytes += rawBytes;
		slot.queuedWireBytesEstimate += wireBytes;
		slot.lastQueuedAt = Date.now();
	}

	/** Send base64-encoded PCM audio to Gemini as realtime input. */
	sendAudio(base64Data: string): void {
		const slot = this.upstream.audio;
		const raw = Buffer.byteLength(base64Data, 'base64');
		this.noteAttempt(slot, raw, base64Data.length);
		const session = this.session;
		if (!session) {
			this.noteSkip(slot, () => slot.skippedNoSession++);
			return;
		}
		// Use `audio` not `media` — the SDK maps `media` to deprecated `media_chunks`
		// wire format, which Gemini 3.1 rejects with 1007.
		this.sendTracked(slot, raw, base64Data.length, () =>
			session.sendRealtimeInput({
				audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' },
			}),
		);
	}

	/** Send tool execution results back to Gemini (legacy API). */
	sendToolResponse(
		responses: Array<{ id?: string; name?: string; response?: Record<string, unknown> }>,
		_scheduling?: 'SILENT' | 'WHEN_IDLE' | 'INTERRUPT',
	): void {
		if (!this.session) return;
		this.session.sendToolResponse({ functionResponses: responses });
	}

	/** Send text-based conversation turns to Gemini.
	 *
	 * Uses `sendRealtimeInput({ text })` — required by `gemini-3.x-flash-live-preview`
	 * models, which reject the legacy `sendClientContent` text path with WebSocket
	 * close code 1011 "Internal error encountered". Verified to also work on
	 * `gemini-2.5-flash-native-audio-preview-12-2025`, so the migration is
	 * unconditional (no model-version gate needed).
	 *
	 * Multi-turn input is concatenated into a single text string with newline
	 * separators. Role information is preserved via inline "<role>:" prefixes so
	 * the model can still distinguish user/model turns in the concatenated blob.
	 * The `turnComplete` parameter is ignored by `sendRealtimeInput`; the Gemini
	 * Live API decides turn boundaries via automatic activity detection.
	 */
	sendClientContent(
		turns: Array<{ role: string; parts: Array<{ text: string }> }>,
		_turnComplete = true,
	): void {
		const text = turns
			.map((t) => {
				const body = (t.parts || [])
					.map((p) => p.text)
					.filter(Boolean)
					.join(' ');
				if (!body) return '';
				return turns.length > 1 ? `${t.role}: ${body}` : body;
			})
			.filter(Boolean)
			.join('\n');
		this.sendText(text);
	}

	/** Update the tool declarations (applied on next reconnect). */
	updateTools(tools: ToolDefinition[]): void {
		this.config.tools = tools;
	}

	/** Update the system instruction (applied on next reconnect). */
	updateSystemInstruction(instruction: string): void {
		this.config.systemInstruction = instruction;
	}

	/** Update Google Search grounding flag (applied on next reconnect). */
	updateGoogleSearch(enabled: boolean): void {
		this.config.googleSearch = enabled;
	}

	get isConnected(): boolean {
		return this.session !== null;
	}

	/** Snapshot, not a live reference — safe for a caller to hold across ticks. */
	getDiagnostics(): TransportDiagnostics {
		return {
			upstream: structuredClone(this.upstream),
			transportGeneration: this.transportGeneration,
		};
	}

	// --- LLMTransport methods ---

	/** Send provider-neutral content turns to Gemini.
	 *
	 * Uses `sendRealtimeInput({ text })` for the reasons documented on
	 * `sendClientContent` above. `assistant` role is mapped to `model:` prefix
	 * in the concatenated text so the model can still recognize its own past
	 * turns in the injected context.
	 */
	sendContent(turns: ContentTurn[], _turnComplete = true): void {
		const text = turns
			.map((t) => {
				const role = t.role === 'assistant' ? 'model' : t.role;
				if (!t.text) return '';
				return turns.length > 1 ? `${role}: ${t.text}` : t.text;
			})
			.filter(Boolean)
			.join('\n');
		this.sendText(text);
	}

	/** Shared tracked path for both text APIs — they differ only in how the
	 *  joined text is assembled, so the state machine lives once. */
	private sendText(text: string): void {
		const slot = this.upstream.text;
		const bytes = Buffer.byteLength(text, 'utf8');
		this.noteAttempt(slot, bytes, bytes);
		const session = this.session;
		if (!session) {
			this.noteSkip(slot, () => slot.skippedNoSession++);
			return;
		}
		if (!text) {
			this.noteSkip(slot, () => slot.skippedEmpty++);
			return;
		}
		this.sendTracked(slot, bytes, bytes, () => session.sendRealtimeInput({ text }));
	}

	/** Send a file/image to Gemini as realtime input.
	 *
	 * Branches on mimeType prefix because Gemini Live's realtime_input
	 * has separate slots for audio/video/text — not a generic "media"
	 * slot. The `@google/genai` SDK's `media` field maps to the
	 * deprecated `media_chunks` wire format, which Gemini 3.1 rejects
	 * with close code 1007. Companion to #2 (`sendAudio` media→audio).
	 *
	 *   image/* → `video` (Gemini treats images as single-frame video)
	 *   audio/* → `audio` (symmetric with sendAudio, though callers
	 *             should prefer sendAudio for live PCM streams)
	 *   other → warn + no-op. Gemini Live realtime_input has no slot
	 *           for arbitrary files (PDFs, docs, etc.). The previous
	 *           sendClientContent({ inlineData }) path is not viable
	 *           under #1's sendClientContent text-only narrowing.
	 *           Consumers wanting to attach non-image/non-audio files
	 *           during a voice session should call sendContent with a
	 *           [System: user attached file] prefix text instead.
	 */
	sendFile(base64Data: string, mimeType: string): void {
		// Slot by destination: image/* fills the video slot; audio/* folds into
		// the audio counters — same wire slot sendAudio uses.
		const slot = mimeType.startsWith('audio/') ? this.upstream.audio : this.upstream.video;
		const raw = Buffer.byteLength(base64Data, 'base64');
		this.noteAttempt(slot, raw, base64Data.length);
		const session = this.session;
		if (!session) {
			this.noteSkip(slot, () => slot.skippedNoSession++);
			return;
		}
		if (mimeType.startsWith('image/')) {
			this.sendTracked(slot, raw, base64Data.length, () =>
				session.sendRealtimeInput({ video: { data: base64Data, mimeType } }),
			);
			return;
		}
		if (mimeType.startsWith('audio/')) {
			this.sendTracked(slot, raw, base64Data.length, () =>
				session.sendRealtimeInput({ audio: { data: base64Data, mimeType } }),
			);
			return;
		}
		this.noteSkip(this.upstream.video, () => this.upstream.video.unsupportedMime++);
		console.warn(
			`[GeminiLiveTransport] sendFile: unsupported mimeType "${mimeType}" — Gemini Live realtime_input only supports image/* and audio/*. For other file types, summarize via sendContent with a text marker.`,
		);
	}

	/** Send a tool result back to Gemini (LLMTransport API). */
	sendToolResult(result: TransportToolResult): void {
		if (!this.session) return;
		this.session.sendToolResponse({
			functionResponses: [
				{ id: result.id, name: result.name, response: sanitizeForStruct(result.result) },
			],
		});
	}

	/** No-op for Gemini — generation is automatic after tool results and content injection. */
	triggerGeneration(_instructions?: string): void {
		// Gemini auto-generates after sendToolResponse and sendRealtimeInput
	}

	/** No-op for V1 — server VAD only. */
	commitAudio(): void {}

	/** No-op for V1 — server VAD only. */
	clearAudio(): void {}

	/** Update session configuration (applied on next reconnect for Gemini). */
	updateSession(config: SessionUpdate): void {
		if (config.instructions !== undefined) {
			this.config.systemInstruction = config.instructions;
		}
		if (config.tools !== undefined) {
			this.config.tools = config.tools;
		}
		if (config.providerOptions !== undefined) {
			if (typeof config.providerOptions.googleSearch === 'boolean') {
				this.config.googleSearch = config.providerOptions.googleSearch;
			}
			if (config.providerOptions.compressionConfig) {
				this.config.compressionConfig = config.providerOptions.compressionConfig as {
					triggerTokens: number;
					targetTokens: number;
				};
			}
		}
	}

	/** Transfer session: update config → reconnect → replay conversation history. */
	async transferSession(config: SessionUpdate, state?: ReconnectState): Promise<void> {
		this.updateSession(config);
		// Use internal resumption handle (stored from onResumptionUpdate)
		await this.disconnect();
		await this.connect();

		// Replay conversation history if provided
		if (state?.conversationHistory?.length) {
			this.replayHistory(state.conversationHistory);
		}
	}

	// --- Private helpers ---

	/** Apply LLMTransportConfig fields to the internal GeminiTransportConfig. */
	/** Merge LLMTransportConfig into the internal config. Only provided fields are applied;
	 *  undefined fields preserve existing constructor values.
	 */
	private applyTransportConfig(config: LLMTransportConfig): void {
		if (config.auth.type === 'api_key') {
			this.ai = new GoogleGenAI({ apiKey: config.auth.apiKey });
		}
		if (config.model !== undefined) {
			this.config.model = config.model;
		}
		if (config.instructions !== undefined) {
			this.config.systemInstruction = config.instructions;
		}
		if (config.tools !== undefined) {
			this.config.tools = config.tools;
		}
		if (config.voice !== undefined) {
			this.config.speechConfig = { voiceName: config.voice };
		}
		if (config.transcription !== undefined) {
			this.config.inputAudioTranscription = config.transcription.input ?? true;
		}
		if (config.providerOptions) {
			if (typeof config.providerOptions.googleSearch === 'boolean') {
				this.config.googleSearch = config.providerOptions.googleSearch;
			}
			if (config.providerOptions.compressionConfig) {
				this.config.compressionConfig = config.providerOptions.compressionConfig as {
					triggerTokens: number;
					targetTokens: number;
				};
			}
		}
	}

	/** Replay prior conversation to Gemini on reconnect.
	 *
	 * Uses `sendRealtimeInput` instead of the legacy `sendClientContent` path
	 * — see the note on `sendClientContent` above for why. Text, tool calls,
	 * tool results, and transfers are flattened into a single concatenated
	 * text string (with role and tool markers inline) and sent as one
	 * `sendRealtimeInput({ text })` call. File/inline-data items are sent
	 * separately via `sendRealtimeInput({ media })` in their original order
	 * relative to the text stream.
	 *
	 * Tradeoff vs the old path: tool call/result turns are now represented as
	 * bracketed text descriptions rather than structured functionCall/
	 * functionResponse objects. The model loses some of the tool-typing
	 * signal on reconnect but gains 3.x-live compatibility. Acceptable for
	 * reconnect history replay; new live tool calls still flow through
	 * `sendToolResponse` on the structured path.
	 */
	private replayHistory(items: ReplayItem[]): void {
		if (!this.session || items.length === 0) return;

		const textChunks: string[] = [];
		for (const item of items) {
			switch (item.type) {
				case 'text': {
					const role = item.role === 'assistant' ? 'model' : item.role;
					textChunks.push(`${role}: ${item.text}`);
					break;
				}
				case 'tool_call':
					textChunks.push(
						`[model called tool ${item.name} with args ${JSON.stringify(item.args)}]`,
					);
					break;
				case 'tool_result':
					textChunks.push(`[tool ${item.name} returned ${JSON.stringify(item.result)}]`);
					break;
				case 'file':
					// Sent separately below via sendRealtimeInput({ media }).
					// Mark position in the text stream so the model knows a
					// file was interleaved here.
					textChunks.push(`[user attached file: ${item.mimeType}]`);
					break;
				case 'transfer':
					textChunks.push(`[Agent transfer: ${item.fromAgent} → ${item.toAgent}]`);
					break;
			}
		}

		// Replay is send traffic like any other — it must hit the counters, or
		// reconnect injection becomes invisible to exactly the accounting that
		// exists to measure it.
		if (textChunks.length > 0) {
			this.sendText(textChunks.join('\n'));
		}

		// Emit file/inline-data items after the text context. Order within
		// files is preserved; position relative to surrounding text is not
		// exact but a bracketed marker above tells the model a file appeared.
		// Routed through sendFile so the counters describe the wire truthfully
		// AND the wire uses the supported slots: the generic `media` field maps
		// to the deprecated media_chunks format Gemini 3.1 rejects with 1007 —
		// the same migration sendAudio and sendFile already made.
		for (const item of items) {
			if (item.type === 'file') {
				this.sendFile(item.base64Data, item.mimeType);
			}
		}
	}

	/** Run an observer without letting its failure reach dispatch. Usage rides on
	 *  the SAME message as audio and goAway, so a throwing hook would drop them. */
	private notifyObserver(label: string, fn: () => void): void {
		try {
			fn();
		} catch (err) {
			console.warn(`[GeminiLiveTransport] ${label} observer threw; dispatch continues:`, err);
		}
	}

	// biome-ignore lint/suspicious/noExplicitAny: LiveServerMessage is a complex union type
	private handleMessage(msg: any): void {
		// BEFORE the branches below, which each return: usage rides along with
		// serverContent and friends, so a branch of its own would miss most of it.
		if (msg.usageMetadata) {
			const usage = msg.usageMetadata as LiveUsageMetadata;
			this.notifyObserver('onUsageMetadata', () => this.callbacks.onUsageMetadata?.(usage));
			this.notifyObserver('onUsageMetadata', () => this.onUsageMetadata?.(usage));
		}

		if (msg.setupComplete) {
			// A connection that completed setup is a new generation; upstream
			// counters reset with it — a new socket genuinely starts at zero.
			this.transportGeneration++;
			this.upstream = freshUpstreamCounters();
			this.currentAttemptSetupDone = true;
			this.emitLifecycle({
				kind: 'setup-ok',
				connectAttemptId: this.currentAttemptId,
				transportGeneration: this.transportGeneration,
			});
			// Resolve the connect() promise so callers know Gemini is ready
			if (this.setupResolver) {
				this.setupResolver();
				this.setupResolver = null;
			}
			const sessionId = msg.setupComplete.sessionId ?? '';
			this.callbacks.onSetupComplete?.(sessionId);
			if (this.onSessionReady) this.onSessionReady(sessionId);
			return;
		}

		if (msg.serverContent) {
			const content = msg.serverContent;

			// Audio output — fire onModelTurnStart on first modelTurn.parts per turn
			if (content.modelTurn?.parts) {
				this.beginGenerationIfNew(true);
				for (const part of content.modelTurn.parts) {
					if (part.inlineData?.data) {
						this.callbacks.onAudioOutput?.(part.inlineData.data);
						if (this.onAudioOutput) this.onAudioOutput(part.inlineData.data);
					}
				}
			}

			// Grounding metadata (Google Search results)
			if (content.groundingMetadata) {
				this.callbacks.onGroundingMetadata?.(content.groundingMetadata);
				if (this.onGroundingMetadata) this.onGroundingMetadata(content.groundingMetadata);
			}

			// Transcriptions
			if (content.inputTranscription?.text) {
				this.callbacks.onInputTranscription?.(content.inputTranscription.text);
				if (this.onInputTranscription) this.onInputTranscription(content.inputTranscription.text);
			}
			if (content.outputTranscription?.text) {
				this.callbacks.onOutputTranscription?.(content.outputTranscription.text);
				if (this.onOutputTranscription)
					this.onOutputTranscription(content.outputTranscription.text);
			}

			// Turn signals
			if (content.interrupted) {
				// Barged in on: this generation is over.
				this.endGeneration('interrupted');
				this.callbacks.onInterrupted?.();
				if (this.onInterrupted) this.onInterrupted();
			}
			// Gemini sends generationComplete when the MODEL FINISHED GENERATING,
			// separately from turnComplete. Only the latter was read, so the finer
			// boundary was invisible upstream and consumers had to treat
			// turnComplete as generation-final. Surfaced, not acted on: nothing
			// below changes what turnComplete does.
			if (content.generationComplete) {
				this.endGeneration('generationComplete');
				this.callbacks.onGenerationComplete?.();
				if (this.onGenerationComplete) this.onGenerationComplete();
			}
			if (content.turnComplete) {
				// DRAINING, not over. A late tool call still belongs to this
				// generation. The callbacks below are unchanged.
				if (this._genState === 'active') this._genState = 'draining';
				this.callbacks.onTurnComplete?.();
				if (this.onTurnComplete) this.onTurnComplete();
			}
			return;
		}

		if (msg.toolCall?.functionCalls?.length) {
			// A tool call opens a generation only if none is underway. After a
			// turnComplete it is this generation's tail, NOT a new turn — that
			// misread is what made one answer look like two.
			this.beginGenerationIfNew(false);
			this.callbacks.onToolCall?.(msg.toolCall.functionCalls);
			if (this.onToolCall) this.onToolCall(msg.toolCall.functionCalls);
			return;
		}

		if (msg.toolCallCancellation?.ids?.length) {
			this.callbacks.onToolCallCancellation?.(msg.toolCallCancellation.ids);
			if (this.onToolCallCancel) this.onToolCallCancel(msg.toolCallCancellation.ids);
			return;
		}

		if (msg.goAway) {
			this.callbacks.onGoAway?.(msg.goAway.timeLeft ?? '');
			if (this.onGoAway) this.onGoAway(msg.goAway.timeLeft ?? '');
			return;
		}

		if (msg.sessionResumptionUpdate?.newHandle) {
			// Store the handle INTERNALLY so the next connect() actually resumes
			// (sutando-meeting#129). Pre-fix, only callbacks fired — nothing wrote
			// config.resumptionHandle, so a GoAway "resume" opened a FRESH session
			// (sessionResumption: {}) with zero server-side context, and the
			// conversationHistory replay papered over it (realtime-INPUT replay =
			// the model re-answers old turns verbatim). Only a resumable handle is
			// kept: a non-resumable update means the current handle is dead.
			if (msg.sessionResumptionUpdate.resumable ?? false) {
				this.config.resumptionHandle = msg.sessionResumptionUpdate.newHandle;
			} else {
				this.config.resumptionHandle = undefined;
			}
			this.callbacks.onResumptionUpdate?.(
				msg.sessionResumptionUpdate.newHandle,
				msg.sessionResumptionUpdate.resumable ?? false,
			);
			if (this.onResumptionUpdate) {
				this.onResumptionUpdate(
					msg.sessionResumptionUpdate.newHandle,
					msg.sessionResumptionUpdate.resumable ?? false,
				);
			}
		}
	}
}

/** Convert a ToolDefinition to a Gemini function declaration (name + description + JSON Schema). */
/**
 * Recursively sanitize a value so it conforms to google.protobuf.Struct.
 * Struct only supports: null, boolean, number, string, array, and object.
 * Strips undefined fields and converts non-serializable values to strings.
 */
function sanitizeForStruct(value: unknown): Record<string, unknown> {
	const sanitized = sanitizeValue(value);
	if (typeof sanitized === 'object' && sanitized !== null && !Array.isArray(sanitized)) {
		return sanitized as Record<string, unknown>;
	}
	return { result: sanitized };
}

function sanitizeValue(value: unknown): unknown {
	if (value === undefined || value === null) return null;
	if (typeof value === 'boolean' || typeof value === 'string') return value;
	if (typeof value === 'number') {
		if (!Number.isFinite(value)) return String(value);
		return value;
	}
	if (Array.isArray(value)) return value.map(sanitizeValue);
	if (typeof value === 'object') {
		const out: Record<string, unknown> = {};
		for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
			if (v !== undefined) out[k] = sanitizeValue(v);
		}
		return out;
	}
	return String(value);
}

function toolToDeclaration(tool: ToolDefinition): Record<string, unknown> {
	return {
		name: tool.name,
		description: tool.description,
		parameters: zodToJsonSchema(tool.parameters),
	};
}
