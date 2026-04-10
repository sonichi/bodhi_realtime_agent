// SPDX-License-Identifier: MIT

import { GoogleGenAI, type LiveServerMessage, type Session } from '@google/genai';
import { DEFAULT_CONNECT_TIMEOUT_MS, DEFAULT_RECONNECT_TIMEOUT_MS } from '../core/constants.js';
import type { ToolDefinition } from '../types/tool.js';
import type {
	AudioFormatSpec,
	ContentTurn,
	LLMTransport,
	LLMTransportConfig,
	LLMTransportError,
	ReconnectState,
	ReplayItem,
	SessionUpdate,
	TransportCapabilities,
	TransportToolCall,
	TransportToolResult,
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
	compressionConfig?: { triggerTokens: number; targetTokens: number };
	/** Enable Gemini's built-in Google Search grounding. */
	googleSearch?: boolean;
	/** Enable server-side transcription of user audio input (default: true). */
	inputAudioTranscription?: boolean;
	/** Timeout in ms for connect() to receive setupComplete (default: 30000). */
	connectTimeoutMs?: number;
	/** Timeout in ms for the overall reconnect operation (default: 45000). */
	reconnectTimeoutMs?: number;
}

/** Callbacks fired by GeminiLiveTransport when server messages arrive. */
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
	onModelTurnStart?(): void;
	/** Transcription of user's spoken input. */
	onInputTranscription?(text: string): void;
	/** Transcription of model's spoken output. */
	onOutputTranscription?(text: string): void;
	/** Server is shutting down — reconnect before timeLeft expires. */
	onGoAway?(timeLeft: string): void;
	/** New session resumption handle available. */
	onResumptionUpdate?(handle: string, resumable: boolean): void;
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
export class GeminiLiveTransport implements LLMTransport {
	private session: Session | null = null;
	private ai: GoogleGenAI;
	private callbacks: GeminiTransportCallbacks;
	private config: GeminiTransportConfig;
	/** Resolves when setupComplete fires — used to make connect() await Gemini readiness. */
	private setupResolver: (() => void) | null = null;
	/** Tracks whether onModelTurnStart has already fired for the current turn. */
	private _modelTurnStarted = false;

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
	onModelTurnStart?: () => void;
	onGoAway?: (timeLeft: string) => void;
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
			connectConfig.contextWindowCompression = {
				triggerTokens: this.config.compressionConfig.triggerTokens,
				slidingWindow: { targetTokens: this.config.compressionConfig.targetTokens },
			};
		}

		this.session = await this.ai.live.connect({
			model,
			config: connectConfig,
			callbacks: {
				onopen: () => {},
				onmessage: (msg: LiveServerMessage) => this.handleMessage(msg),
				onerror: (e: { message?: string }) => {
					const error = new Error(e.message ?? 'WebSocket error');
					this.callbacks.onError?.(error);
					if (this.onError) this.onError({ error, recoverable: true });
				},
				onclose: (e: { code?: number; reason?: string }) => {
					const code = e?.code;
					const reason = e?.reason;
					this.callbacks.onClose?.(code, reason);
					if (this.onClose) this.onClose(code, reason);
				},
			},
		});

		const timeoutMs = this.config.connectTimeoutMs ?? DEFAULT_CONNECT_TIMEOUT_MS;
		let timer: ReturnType<typeof setTimeout> | undefined;
		const timeout = new Promise<never>((_, reject) => {
			timer = setTimeout(
				() => reject(new Error(`Gemini connect timed out after ${timeoutMs}ms`)),
				timeoutMs,
			);
		});
		await Promise.race([setupComplete, timeout]).finally(() => clearTimeout(timer));
	}

	/** Disconnect and reconnect, optionally with a new resumption handle or ReconnectState.
	 *  Accepts either a string handle (legacy API) or ReconnectState (LLMTransport API).
	 */
	async reconnect(stateOrHandle?: ReconnectState | string): Promise<void> {
		const timeoutMs = this.config.reconnectTimeoutMs ?? DEFAULT_RECONNECT_TIMEOUT_MS;
		const timer = setTimeout(() => {
			// Force-kill the stale session so disconnect() unblocks
			this.session = null;
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

	async disconnect(): Promise<void> {
		this._modelTurnStarted = false;
		if (this.session) {
			try {
				await this.session.close();
			} catch {
				// Ignore close errors
			}
			this.session = null;
		}
	}

	/** Send base64-encoded PCM audio to Gemini as realtime input. */
	sendAudio(base64Data: string): void {
		if (!this.session) return;
		// Use `audio` not `media` — the SDK maps `media` to deprecated `media_chunks`
		// wire format, which Gemini 3.1 rejects with 1007.
		this.session.sendRealtimeInput({
			audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' },
		});
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
		if (!this.session) return;
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
		if (!text) return;
		this.session.sendRealtimeInput({ text });
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

	// --- LLMTransport methods ---

	/** Send provider-neutral content turns to Gemini.
	 *
	 * Uses `sendRealtimeInput({ text })` for the reasons documented on
	 * `sendClientContent` above. `assistant` role is mapped to `model:` prefix
	 * in the concatenated text so the model can still recognize its own past
	 * turns in the injected context.
	 */
	sendContent(turns: ContentTurn[], _turnComplete = true): void {
		if (!this.session) return;
		const text = turns
			.map((t) => {
				const role = t.role === 'assistant' ? 'model' : t.role;
				if (!t.text) return '';
				return turns.length > 1 ? `${role}: ${t.text}` : t.text;
			})
			.filter(Boolean)
			.join('\n');
		if (!text) return;
		this.session.sendRealtimeInput({ text });
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
		if (!this.session) return;
		if (mimeType.startsWith('image/')) {
			this.session.sendRealtimeInput({
				video: { data: base64Data, mimeType },
			});
			return;
		}
		if (mimeType.startsWith('audio/')) {
			this.session.sendRealtimeInput({
				audio: { data: base64Data, mimeType },
			});
			return;
		}
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

		if (textChunks.length > 0) {
			this.session.sendRealtimeInput({ text: textChunks.join('\n') });
		}

		// Emit file/inline-data items after the text context. Order within
		// files is preserved; position relative to surrounding text is not
		// exact but a bracketed marker above tells the model a file appeared.
		for (const item of items) {
			if (item.type === 'file') {
				this.session.sendRealtimeInput({
					media: { data: item.base64Data, mimeType: item.mimeType },
				});
			}
		}
	}

	// biome-ignore lint/suspicious/noExplicitAny: LiveServerMessage is a complex union type
	private handleMessage(msg: any): void {
		if (msg.setupComplete) {
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
				if (!this._modelTurnStarted) {
					this._modelTurnStarted = true;
					this.callbacks.onModelTurnStart?.();
					if (this.onModelTurnStart) this.onModelTurnStart();
				}
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
				this.callbacks.onInterrupted?.();
				if (this.onInterrupted) this.onInterrupted();
			}
			if (content.turnComplete) {
				this._modelTurnStarted = false;
				this.callbacks.onTurnComplete?.();
				if (this.onTurnComplete) this.onTurnComplete();
			}
			return;
		}

		if (msg.toolCall?.functionCalls?.length) {
			// Fire onModelTurnStart on first toolCall if no audio preceded it
			if (!this._modelTurnStarted) {
				this._modelTurnStarted = true;
				this.callbacks.onModelTurnStart?.();
				if (this.onModelTurnStart) this.onModelTurnStart();
			}
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
