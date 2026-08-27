// SPDX-License-Identifier: MIT

import type { LanguageModelV1 } from 'ai';
import { resolveInstructions } from '../agent/agent-context.js';
import { AgentRouter } from '../agent/agent-router.js';
import type { SubagentMessage } from '../agent/subagent-session.js';
import { BehaviorManager } from '../behaviors/behavior-manager.js';
import { MemoryDistiller } from '../memory/memory-distiller.js';
import { ToolExecutor } from '../tools/tool-executor.js';
import { ClientTransport } from '../transport/client-transport.js';
import { EchoGuard, type EchoGuardConfig } from '../transport/echo-guard.js';
import { GeminiLiveTransport } from '../transport/gemini-live-transport.js';
import type { MainAgent, SubagentConfig } from '../types/agent.js';
import type { BehaviorCategory } from '../types/behavior.js';
import type { FrameworkHooks } from '../types/hooks.js';
import type { MemoryStore } from '../types/memory.js';
import type {
	ConnectionLifecycleEvent,
	LLMTransport,
	LLMTransportError,
	STTProvider,
	TransportUsageMetadata,
	UpstreamCounters,
} from '../types/transport.js';
import { BackgroundNotificationQueue } from './background-notification-queue.js';
import { ConversationContext } from './conversation-context.js';
import { DirectiveManager } from './directive-manager.js';
import { EventBus } from './event-bus.js';
import { HooksManager } from './hooks.js';
import { InteractionModeManager } from './interaction-mode.js';
import { MemoryCacheManager } from './memory-cache-manager.js';
import { SessionManager } from './session-manager.js';
import { compareTranscripts, isSubstantiveDivergence } from './shadow-stt.js';
import { ToolCallRouter } from './tool-call-router.js';
import { TranscriptManager } from './transcript-manager.js';

/**
 * Configuration for creating a VoiceSession.
 */
/** Shape returned by {@link VoiceSession.getDiagnostics}. */
export interface VoiceSessionDiagnostics {
	upstream: UpstreamCounters | null;
	transportGeneration: number | null;
	/** EchoGuard.suppressedCount — monotonic per session, 0 when disabled. */
	echoSuppressed: number;
}

export interface VoiceSessionConfig {
	/** Unique session identifier. */
	sessionId: string;
	/** User identifier (used for memory storage and history). */
	userId: string;
	/** Google API key for the Gemini Live API (used when no transport is provided). */
	apiKey: string;
	/** All agents available in this session. */
	agents: MainAgent[];
	/** Name of the agent to activate on start. */
	initialAgent: string;
	/** Background subagent configs keyed by tool name. */
	subagentConfigs?: Record<string, SubagentConfig>;
	/** Lifecycle hooks for observability. */
	hooks?: FrameworkHooks;
	/** Port for the client WebSocket server. */
	port: number;
	/** Host for the client WebSocket server (default: '0.0.0.0' for all interfaces). */
	host?: string;
	/** LLM model name (e.g. "gemini-live-2.5-flash-preview"). */
	geminiModel?: string;
	/** Vercel AI SDK model for subagent text generation. */
	model: LanguageModelV1;
	/** Voice configuration for Gemini's speech output. */
	speechConfig?: { voiceName?: string };
	/** Context window compression thresholds. */
	/** Context-window compression. Supply the object with NO thresholds to enable
	 *  it with the server's defaults (trigger 80% of the model limit, target half). */
	compressionConfig?: { triggerTokens?: number; targetTokens?: number };
	/** Session-wide media token cost for video/image input (Gemini only). LOW =
	 *  64 tokens per frame. Applies to every realtime-input image on the session,
	 *  one-shots included — realtime input has no per-send override. (Client-
	 *  content Parts can override per-part; this transport does not send those.) */
	mediaResolution?: 'MEDIA_RESOLUTION_LOW' | 'MEDIA_RESOLUTION_MEDIUM' | 'MEDIA_RESOLUTION_HIGH';
	/** Gemini automatic-VAD tuning — passed through to the Live API as
	 *  realtimeInputConfig.automaticActivityDetection. Shorten silenceDurationMs
	 *  to make end-of-turn detection (and thus the bot's reply) faster. */
	vadConfig?: {
		disabled?: boolean;
		startOfSpeechSensitivity?: string;
		endOfSpeechSensitivity?: string;
		prefixPaddingMs?: number;
		silenceDurationMs?: number;
	};
	/** Enable server-side transcription of user audio input (default: true).
	 *  Has no effect when sttProvider is set (built-in is disabled automatically).
	 *  Use false to disable all input transcription for privacy or cost control. */
	inputAudioTranscription?: boolean;
	/** External STT provider for user input transcription.
	 *  When set, transport built-in transcription is automatically disabled.
	 *  When omitted, the transport's built-in transcription is used. */
	sttProvider?: STTProvider;
	/** SHADOW STT provider — observation-only dual transcription (2026-07-30).
	 *  Unlike sttProvider, this does NOT replace the transport's built-in
	 *  transcription: both stay active, the shadow's per-turn transcript is
	 *  compared against what the model itself heard, and a divergence is
	 *  logged + surfaced via onTranscriptionDivergence. NOTHING about what the
	 *  model hears, answers, or stores changes — a Live-model mishear is
	 *  otherwise self-consistent (transcript and answer agree) and invisible;
	 *  this is the tell. Omit = zero change. */
	shadowSttProvider?: STTProvider;
	/** Called when the shadow STT disagrees with the built-in transcription
	 *  (normalized compare; containment = streaming truncation, not a mishear). */
	onTranscriptionDivergence?: (liveText: string, shadowText: string, turnId?: number) => void;
	/** Connection-lifecycle facts: attempt / setup-ok / setup-failed /
	 *  attempt-close / generation-close, correlated by connectAttemptId.
	 *  `handleSupplied` on the attempt is what lets a consumer track resumed
	 *  lineages without inferring them from log lines. */
	onConnectionLifecycle?: (event: ConnectionLifecycleEvent) => void;
	/** Server-reported token accounting, once per message that carries it.
	 *  `promptTokenCount` is the standing prompt size — the signal for context
	 *  growth. Fires only on transports that report usage. */
	onUsageMetadata?: (usage: TransportUsageMetadata) => void;
	/** Client protocol frames the built-in chain does not handle (e.g. the
	 *  host's voice.retryUpstream). Built-ins always run first. */
	onClientCommand?: (message: Record<string, unknown>) => void;
	/** Real client attach/detach edges — what lets a host resend durable
	 *  state (e.g. voice-stalled) exactly when a client is there to hear it. */
	onClientConnected?: () => void;
	onClientDisconnected?: () => void;
	/** When true at attach time, the client is configured but greeting,
	 *  context replay and the CLOSED auto-reconnect are suppressed — the
	 *  host's recovery-terminal gate (no uncounted dials past its budget). */
	suppressClientAutoActions?: () => boolean;
	/** With shadowSttProvider set: on divergence, SPEAK a self-correction — the
	 *  model is told what the user actually said and answers the real question
	 *  ("说错自纠", owner-selected option ① 2026-07-30). The shadow result
	 *  arrives 1-3s behind live speech, so the wrong first answer still starts
	 *  playing; this interrupts it with the correction. Stale results (a newer
	 *  turn already started) never fire. Default OFF — observation only. */
	divergenceCorrection?: boolean;
	/** Behavior categories for dynamic runtime tuning (speech speed, verbosity, etc.). */
	behaviors?: BehaviorCategory[];
	/** Enable memory distillation. Extracts durable user facts from conversation and persists them. */
	memory?: {
		/** Where to persist extracted facts. */
		store: MemoryStore;
		/** Extract every N turns (default: 5). */
		turnFrequency?: number;
	};
	/** Pre-constructed LLM transport. If provided, apiKey/geminiModel/speechConfig/compressionConfig are ignored. */
	transport?: LLMTransport;
	/** Acoustic echo suppression at the audio-ingestion chokepoint: inbound audio whose
	 *  energy envelope correlates with recently PLAYED audio (speakerphone loopback) is
	 *  dropped before it reaches the model or STT — the root fix for hallucinated
	 *  "phantom command" transcripts from echo (sutando-meeting#127). OPT-IN: pass
	 *  `{ enabled: true }` to activate (double-talk on strong-echo paths can drop
	 *  overlapped user speech — a deliberate per-deployment choice); env
	 *  BODHI_ECHO_GUARD=0 hard-disables. */
	echoGuard?: EchoGuardConfig;
	/** Supplies the JSON state frame sent to `?probe=1` health-probe connections
	 *  on the client WebSocket server. When absent, probes are upgraded and
	 *  closed (code 1000) without a frame. Probe sockets never attach as the
	 *  client and never fire connect/disconnect handling. */
	probeState?: () => object;
	/** A verification-role (`?verify=1`) connection attached. Narrow hook for
	 *  embedders (e.g. to wake upstream); real-client connect side effects
	 *  (greeting, context replay, clientConnected accounting) never run for it. */
	onVerifierConnected?: () => void;
	/** The verification-role connection detached (clean close or preemption by
	 *  an arriving real client). */
	onVerifierDisconnected?: () => void;
}

/**
 * Top-level integration hub that wires all framework components together.
 *
 * Manages the full lifecycle of a real-time voice session:
 * - **Audio fast-path**: Client audio → LLM (and back) without touching the EventBus.
 * - **Tool routing**: Inline tools execute synchronously; background tools hand off to subagents.
 * - **Agent transfers**: Intercepts `transfer_to_agent` tool calls and delegates to AgentRouter.
 * - **Reconnection**: Handles GoAway signals and unexpected disconnects via session resumption.
 * - **Conversation tracking**: Transcriptions populate ConversationContext automatically.
 *
 * @example
 * ```ts
 * const session = new VoiceSession({
 *   sessionId: 'session_1',
 *   userId: 'user_1',
 *   apiKey: process.env.GOOGLE_API_KEY,
 *   agents: [mainAgent, expertAgent],
 *   initialAgent: 'main',
 *   port: 9900,
 *   model: google('gemini-2.5-flash'),
 * });
 * await session.start();
 * ```
 */
/** Versioned recovery-capability descriptor. Consumers (the engine's
 *  ACTIVE-silence watchdog) gate ARMED mode on this object, not on method
 *  sniffing; every field names a behavior contract from the desktop design
 *  doc design-voice-active-silence-recovery.md. */
export interface RecoveryCapabilities {
	version: 1;
	recoverUpstream: boolean;
	reconnectBoundary: boolean;
	turnStartPublication: boolean;
	transportGenerations: boolean;
	syntheticHold: boolean;
}

/** The full descriptor — what a session with the native Gemini transport
 *  supports. getRecoveryCapabilities() downgrades it for transports that
 *  lack the recovery primitives; armed mode must read the method, never
 *  this constant. */
export const RECOVERY_CAPABILITIES: RecoveryCapabilities = Object.freeze({
	version: 1,
	recoverUpstream: true,
	reconnectBoundary: true,
	turnStartPublication: true,
	transportGenerations: true,
	syntheticHold: true,
});

/** Descriptor for injected transports without abortIncumbent/generation
 *  counters: boundary and hold are session-side and still work; atomic
 *  recovery and generation correlation do not. */
const DEGRADED_RECOVERY_CAPABILITIES: RecoveryCapabilities = Object.freeze({
	version: 1,
	recoverUpstream: false,
	reconnectBoundary: true,
	turnStartPublication: true,
	transportGenerations: false,
	syntheticHold: true,
});

/** The transport surface recoverUpstream needs; feature-detected because
 *  LLMTransport implementations outside this package predate it. */
interface RecoveryTransportOps {
	abortIncumbent: () => Promise<'closed' | 'forced'>;
	currentDialGen: number;
	currentTransportGeneration: number;
	connect: (c?: unknown) => Promise<void>;
}

export interface RecoverUpstreamArgs {
	reason: 'active-silence' | 'human-retry' | 'fatal-backoff-clear';
	skipContextInjection: boolean;
	holdSyntheticUntilFreshSpeech: boolean;
}

export interface RecoverUpstreamResult {
	/** The DIAL generation this recovery dials on — the same domain as the
	 *  tool-call and turn.start `attemptEpoch` fences, and as the lifecycle
	 *  `att_<n>` attempt id. NOT `turn.start.transportGeneration`, which is the
	 *  post-setup counter and is legitimately lower (the dial counter also
	 *  advances on failed and aborted dials). Compare dial to dial: callbacks,
	 *  acks and turn.start events carrying a lower `attemptEpoch` are stale. */
	attemptEpoch: number;
	/** Resolves when the replacement transport is ACTIVE; rejects on dial
	 *  failure (the caller's reducer enters waiting-retry on rejection). */
	activated: Promise<void>;
	/** Incumbent cleanup: bounded, never rejects. */
	incumbentClosed: Promise<'closed' | 'forced'>;
}

export class VoiceSession {
	/** Max wait for a reconnect attempt before giving up and transitioning
	 *  to CLOSED. Without this deadline, an ECONNRESET on the in-flight
	 *  reconnect WebSocket dial leaves the promise pending forever. */
	static readonly RECONNECT_DEADLINE_MS = 30_000;

	readonly eventBus: EventBus;
	readonly sessionManager: SessionManager;
	readonly conversationContext: ConversationContext;
	readonly hooks: HooksManager;
	private transport: LLMTransport;
	private clientTransport: ClientTransport;
	private agentRouter: AgentRouter;
	private toolExecutor: ToolExecutor;
	private toolCallRouter!: ToolCallRouter;
	private subagentConfigs: Record<string, SubagentConfig>;
	private behaviorManager?: BehaviorManager;
	private memoryDistiller?: MemoryDistiller;
	private memoryCacheManager?: MemoryCacheManager;
	private turnId = 0;
	private turnFirstAudioAt: number | null = null;
	private sttProvider?: STTProvider;
	private shadowSttProvider?: STTProvider;
	private _liveInputThisTurn = '';
	/** Per-turn snapshots of the built-in transcription, keyed by turnId at
	 *  commit time — the shadow's async result then compares against ITS turn's
	 *  text, never a racing concatenation (qingyun review #25-1). Bounded. */
	private _shadowLiveSnapshots = new Map<number, string>();
	private echoGuard?: EchoGuard;
	private _commitFiredForTurn = false;
	private _shadowLastCommittedTurn = -1;
	private config: VoiceSessionConfig;
	private directiveManager = new DirectiveManager();
	private transcriptManager!: TranscriptManager;
	/** Whether a client WebSocket connection is currently active. */
	private _clientConnected = false;
	/** Set true before reconnecting from CLOSED so handleSetupComplete
	 *  skips the greeting; reconnect path injects silent context instead.
	 *  Needed because CLOSED→CONNECTING is the only legal path back, and
	 *  the CONNECTING state alone doesn't tell handleSetupComplete that
	 *  this is a reconnect (vs. an initial connect). */
	private _skipNextGreeting = false;
	private _syntheticHoldActive = false;
	private _recoveryInFlight: RecoverUpstreamResult | null = null;
	private _lastBoundaryGen: number | null = null;
	/** Increments per client-connect dial; a close during CONNECTING bumps it
	 *  so the abandoned dial's then/catch handlers recognize themselves stale. */
	private _dialGen = 0;
	/** Dial generation each in-flight tool call was issued under, keyed by
	 *  toolCallId. Entries are removed at settlement; the sendToolResult
	 *  fence uses this to drop completions from stranded generations. */
	private _toolCallGens = new Map<string, number>();
	/** turnId -> dial generation at COMMIT time. A batch provider transcribes
	 *  asynchronously, so completion order says nothing about capture order. */
	private _sttCommitGens = new Map<number, number>();
	/** Whether a browser client is currently connected via WebSocket. */
	get clientConnected(): boolean {
		return this._clientConnected;
	}
	private notificationQueue!: BackgroundNotificationQueue;
	private interactionMode = new InteractionModeManager();

	constructor(config: VoiceSessionConfig) {
		this.config = config;
		this.eventBus = new EventBus();
		this.hooks = new HooksManager();
		this.conversationContext = new ConversationContext();
		this.transcriptManager = new TranscriptManager({
			sendToClient: (msg) => this.clientTransport.sendJsonToClient(msg),
			addUserMessage: (text) => this.conversationContext.addUserMessage(text),
			addAssistantMessage: (text) => this.conversationContext.addAssistantMessage(text),
		});

		// Relay finalized user speech to an interactive subagent when one is
		// waiting for input. The callback captures `this` via closure and is only
		// invoked at runtime (agentRouter is initialized before any transcript fires).
		this.transcriptManager.onInputFinalized = (text) => {
			const activeId = this.interactionMode.getActiveToolCallId();
			if (activeId) {
				const session = this.agentRouter.getSubagentSession(activeId);
				if (session && session.state === 'waiting_for_input') {
					session.sendToSubagent(text);
					this.interactionMode.deactivate(activeId);
				}
			}
		};

		// NotificationQueue is created early but messageTruncation is not known until
		// transport is configured below. It defaults to false and is updated after
		// transport setup in the 'Wire LLMTransport' section. For pre-constructed
		// transports, capabilities are available immediately so we pass them here.
		this.notificationQueue = new BackgroundNotificationQueue(
			(turns, turnComplete) => {
				// Convert the Gemini-format turns from the notification queue to ContentTurn[]
				const contentTurns = turns.map((t) => ({
					role: (t.role === 'model' ? 'assistant' : t.role) as 'user' | 'assistant',
					text: t.parts[0]?.text ?? '',
				}));
				this.transport.sendContent(contentTurns, turnComplete);
			},
			(msg) => this.log(msg),
			config.transport?.capabilities?.messageTruncation ?? false,
		);

		if (config.hooks) {
			this.hooks.register(config.hooks);
		}

		this.sessionManager = new SessionManager(
			{
				sessionId: config.sessionId,
				userId: config.userId,
				initialAgent: config.initialAgent,
			},
			this.eventBus,
			this.hooks,
		);

		this.subagentConfigs = config.subagentConfigs ?? {};

		// Set up BehaviorManager early — tools must be declared to the LLM at connect time.
		// Callbacks capture `this` via closures and are only invoked at runtime (not during construction).
		if (config.behaviors?.length) {
			const memoryStore = config.memory?.store;
			const onPresetChange = memoryStore
				? () => {
						const presets = Object.fromEntries(this.behaviorManager?.activePresets ?? []);
						memoryStore.setDirectives(config.userId, presets).catch(() => {
							// Best-effort — directive persistence failure is non-fatal
						});
					}
				: undefined;

			this.behaviorManager = new BehaviorManager(
				config.behaviors,
				(key, value, scope) => this.directiveManager.set(key, value, scope),
				(msg) => this.clientTransport.sendJsonToClient(msg),
				onPresetChange,
			);
		}

		// Set up memory cache and distillation plugin
		if (config.memory) {
			this.memoryCacheManager = new MemoryCacheManager(config.memory.store, config.userId);
			const freq = config.memory.turnFrequency ?? 5;
			this.memoryDistiller = new MemoryDistiller(
				this.conversationContext,
				config.memory.store,
				this.hooks,
				config.model,
				{
					userId: config.userId,
					sessionId: config.sessionId,
					turnFrequency: freq,
				},
			);
			this.log(`Memory distillation enabled (every ${freq} turns)`);
		}

		// Acoustic echo suppression (sutando-meeting#127) — construct up front so
		// both audio chokepoints below can consult it. OPT-IN: inert unless the
		// consumer passes `echoGuard: { enabled: true }` (BODHI_ECHO_GUARD=0 still
		// hard-disables; see the EchoGuard constructor).
		this.echoGuard = new EchoGuard({ ...config.echoGuard, log: (msg) => this.log(msg) });
		if (this.echoGuard.enabled)
			this.log('EchoGuard enabled (envelope-correlation echo suppression)');

		// Set up LLM transport
		const initialAgent = config.agents.find((a) => a.name === config.initialAgent);
		const instructions = initialAgent ? resolveInstructions(initialAgent) : '';
		const behaviorTools = this.behaviorManager?.tools ?? [];
		const allInitialTools = [...(initialAgent?.tools ?? []), ...behaviorTools];

		// Determine inputAudioTranscription setting:
		// When sttProvider is set, disable built-in transcription automatically.
		const inputTranscription = config.sttProvider ? false : config.inputAudioTranscription;

		if (config.transport) {
			// Use pre-constructed transport (OpenAI, mock, etc.)
			this.transport = config.transport;
			// Sync tools and instructions so they're available at connect time.
			// When an external STT provider is active, also disable transport built-in
			// transcription at the provider level (not just the callback) to avoid
			// duplicate backend processing and unnecessary cost.
			this.transport.updateSession({
				instructions,
				tools: allInitialTools.length ? allInitialTools : undefined,
				...(inputTranscription === false && {
					transcription: { input: false },
				}),
			});
		} else {
			// Construct GeminiLiveTransport from config (backward compatibility)
			this.transport = new GeminiLiveTransport(
				{
					apiKey: config.apiKey,
					model: config.geminiModel,
					systemInstruction: instructions,
					tools: allInitialTools.length ? allInitialTools : undefined,
					googleSearch: initialAgent?.googleSearch,
					speechConfig: config.speechConfig,
					compressionConfig: config.compressionConfig,
					mediaResolution: config.mediaResolution,
					vadConfig: config.vadConfig,
					inputAudioTranscription: inputTranscription,
				},
				{},
			);
		}

		// Wire LLMTransport property callbacks — works for both injected and default transports
		this.transport.onAudioOutput = (data) => this.handleAudioOutput(data);
		this.transport.onToolCall = (calls) => {
			// Stamp each call with the dial generation that issued it; the
			// sendToolResult fence drops completions whose generation is gone
			// (a recovery redialed underneath a slow tool).
			const gen = (this.transport as { currentDialGen?: number }).currentDialGen;
			if (gen !== undefined) {
				for (const c of calls) this._toolCallGens.set(c.id ?? '', gen);
			}
			this.toolCallRouter.handleToolCalls(calls);
		};
		this.transport.onToolCallCancel = (ids) => this.toolCallRouter.handleToolCallCancellation(ids);
		this.transport.onTurnComplete = () => this.handleTurnComplete();
		this.transport.onInterrupted = () => this.handleInterrupted();
		this.transport.onOutputTranscription = (text) => this.transcriptManager.handleOutput(text);
		this.transport.onSessionReady = (sessionId) => this.handleSetupComplete(sessionId);
		this.transport.onError = (error) => this.handleTransportError(error);
		this.transport.onClose = (code, reason) => this.handleTransportClose(code, reason);
		this.transport.onGoAway = (timeLeft) => this.handleGoAway(timeLeft);
		this.transport.onResumptionUpdate = (handle, resumable) =>
			this.handleResumptionUpdate(handle, resumable);
		this.transport.onGroundingMetadata = (metadata) => this.handleGroundingMetadata(metadata);
		if (config.onConnectionLifecycle) {
			this.transport.onConnectionLifecycle = (event) => config.onConnectionLifecycle?.(event);
		}
		if (config.onUsageMetadata) {
			this.transport.onUsageMetadata = (usage) => config.onUsageMetadata?.(usage);
		}

		// Wire STT: exactly one transcript path is active per session.
		if (config.sttProvider) {
			this.sttProvider = config.sttProvider;

			// Configure with the transport's actual audio format
			this.sttProvider.configure({
				sampleRate: this.transport.audioFormat.inputSampleRate,
				bitDepth: this.transport.audioFormat.bitDepth,
				channels: this.transport.audioFormat.channels,
			});

			// Wire callbacks — turn-aware ordering protection.
			// Accept results from the current turn or the immediately preceding turn.
			// Batch STT providers fire results asynchronously (e.g., generateContent API call)
			// which may complete after handleTurnComplete increments this.turnId. Using
			// `turnId < this.turnId - 1` prevents dropping valid late results while still
			// rejecting truly stale transcripts from 2+ turns ago.
			this.sttProvider.onTranscript = (text, turnId) => {
				if (turnId !== undefined && turnId < this.turnId - 1) return; // Drop stale results (2+ turns old)
				// The turn window above admits the PRECEDING turn, which is exactly
				// where a pre-recovery capture lands; fence on capture, not arrival.
				if (this.sttCaptureIsStale(turnId)) {
					this.log(`Dropped pre-recovery transcript (turn ${turnId}, captured on a stranded dial)`);
					return;
				}
				// A finalized external transcript is fresh user evidence: it was
				// captured on the current dial, so it postdates the boundary.
				this.handleUserSpeechEvidence();
				this.transcriptManager.handleInput(text);
			};
			this.sttProvider.onPartialTranscript = (text) => {
				this.transcriptManager.handleInputPartial(text);
			};

			// Disable transport built-in input transcription
			this.transport.onInputTranscription = undefined;
		} else {
			// No external STT — use transport built-in transcription
			this.transport.onInputTranscription = (text) => {
				this.handleUserSpeechEvidence();
				if (this.shadowSttProvider) this._liveInputThisTurn += text;
				this.transcriptManager.handleInput(text);
			};
		}

		// Shadow STT (observation-only): feed the same audio to a second
		// transcriber and compare per turn. Built-in transcription stays the
		// one and only source for transcriptManager — the shadow NEVER feeds
		// handleInput (that would double every user turn); it only compares.
		if (config.shadowSttProvider && !config.sttProvider) {
			this.shadowSttProvider = config.shadowSttProvider;
			this.shadowSttProvider.configure({
				sampleRate: this.transport.audioFormat.inputSampleRate,
				bitDepth: this.transport.audioFormat.bitDepth,
				channels: this.transport.audioFormat.channels,
			});
			this.shadowSttProvider.onTranscript = (text, turnId) => {
				const live =
					turnId !== undefined
						? (this._shadowLiveSnapshots.get(turnId) ?? '')
						: this._liveInputThisTurn;
				if (turnId !== undefined) this._shadowLiveSnapshots.delete(turnId);
				else this._liveInputThisTurn = '';
				const r = compareTranscripts(live, text);
				// Heartbeat at every compare (not just divergences) — without this a
				// clean session is indistinguishable from a dead shadow (found while
				// preparing the owner's live test 2026-07-30).
				this.log(`[ShadowSTT] turn ${turnId ?? '?'} compared: ${r.reason}`);
				if (r.diverged) {
					this.log(
						`[ShadowSTT] DIVERGENCE turn=${turnId ?? '?'} live="${r.normalizedLive}" shadow="${r.normalizedShadow}"`,
					);
					try {
						this.config.onTranscriptionDivergence?.(live, text, turnId);
					} catch {
						/* observer must never break the session */
					}
					// Option ① self-correction (owner 2026-07-30 "那不还是错"):
					// only for the CURRENT turn — if the user already moved on to a
					// newer turn, a late correction would derail the live exchange.
					// Two-tier (owner 2026-07-30 "exact match 不一样就 mute 那 mute 的太多了"):
					// EVERY divergence is logged above (data); only a MEANING-BEARING one
					// mutes and corrects — filler/short-artifact diffs stay silent.
					if (
						this.config.divergenceCorrection &&
						turnId !== undefined &&
						turnId === this.turnId &&
						isSubstantiveDivergence(live, text)
					) {
						this.log(`[ShadowSTT] speaking self-correction for turn ${turnId}`);
						try {
							// Owner 2026-07-30 "如果这两个不一样的话你可以把他 mute 掉呀":
							// cut the WRONG answer's remaining audio NOW instead of letting
							// it finish — the client's turn.interrupted handler stops all
							// active playback sources immediately. The user hears ~1-2s of
							// the wrong answer (shadow latency floor), then silence, then
							// the correction. sendContent below also interrupts the model
							// side, so generation stops too.
							const sentOk = this.sendSyntheticContent(
								[
									{
										role: 'user',
										text: `[TRANSCRIPTION CORRECTION — not the user speaking] A second transcription shows the user actually said: "${text}". You answered a mishearing ("${live}"). In ONE short sentence acknowledge the correction (e.g. "sorry — you asked about …"), then answer the user's ACTUAL question. Do not repeat the wrong answer.`,
									},
								],
								true,
								'shadow-stt-correction',
							);
							// Only cut playback when the correction actually went out.
							if (sentOk) this.clientTransport.sendJsonToClient({ type: 'turn.interrupted' });
						} catch {
							/* transport hiccup must never break the session; the divergence is already logged */
						}
					}
				}
			};
		} else if (config.shadowSttProvider && config.sttProvider) {
			this.log(
				'[ShadowSTT] ignored — sttProvider already replaces built-in transcription (nothing to shadow)',
			);
		}

		// Wire onModelTurnStart for STT commit trigger
		// The generation pair. NOT turn.start/turn.end: turn.end is turnComplete,
		// which fires while the generation is still draining its tool tail, so a
		// consumer keying candidates on turn.* closes before the tail arrives.
		// generationId comes from the transport, which is what decides the
		// boundary, so start, end and reason cannot drift apart.
		this.transport.onGenerationStart = (generationId: string) => {
			this.eventBus.publish('generation.start', {
				sessionId: this.config.sessionId,
				generationId,
			});
		};
		this.transport.onGenerationEnd = (generationId, reason) => {
			this.eventBus.publish('generation.end', {
				sessionId: this.config.sessionId,
				generationId,
				reason,
			});
		};
		this.transport.onModelTurnStart = () => {
			// Generation-fenced by construction: this callback only fires from
			// current-generation transport messages (stale ones are dropped at
			// ingress), so the publication inherits the fence. The generation is
			// the post-setup counter — the same one lifecycle setup-ok carries —
			// so consumers can correlate model progress with the activation.
			this.eventBus.publish('turn.start', {
				sessionId: this.config.sessionId,
				turnId: `turn_${this.turnId + 1}`,
				transportGeneration: (this.transport as { currentTransportGeneration?: number })
					.currentTransportGeneration,
				// Both counters, because they are different domains: a consumer
				// fencing on recoverUpstream's epoch must compare dial to dial.
				attemptEpoch: (this.transport as { currentDialGen?: number }).currentDialGen,
			});
			if (this.sttProvider && !this._commitFiredForTurn) {
				this._commitFiredForTurn = true;
				this.stampSttCommit(this.turnId);
				this.sttProvider.commit(this.turnId);
			}
			if (this.shadowSttProvider && this._shadowLastCommittedTurn !== this.turnId) {
				// Per-turnId commit tracking (2026-07-30 live finding: the boolean
				// latch reset too rarely in the discord flow — 2 compares in a
				// 33-turn session; the shadow starved). Keying on turnId cannot
				// starve: each new turn commits exactly once, no reset path needed.
				this._shadowLastCommittedTurn = this.turnId;
				// Snapshot the live text for THIS turn before the next one can
				// start accumulating — the async shadow result pairs by turnId.
				this._shadowLiveSnapshots.set(this.turnId, this._liveInputThisTurn);
				this._liveInputThisTurn = '';
				if (this._shadowLiveSnapshots.size > 8) {
					const oldest = this._shadowLiveSnapshots.keys().next().value;
					if (oldest !== undefined) this._shadowLiveSnapshots.delete(oldest);
				}
				this.shadowSttProvider.commit(this.turnId);
			}
		};

		// Set up client transport
		this.clientTransport = new ClientTransport(
			config.port,
			{
				onAudioFromClient: (data) => this.handleAudioFromClient(data),
				onJsonFromClient: (message) => this.handleJsonFromClient(message),
				onClientConnected: () => this.handleClientConnected(),
				onClientDisconnected: () => this.handleClientDisconnected(),
				onVerifierConnected: config.onVerifierConnected,
				onVerifierDisconnected: config.onVerifierDisconnected,
			},
			config.host ?? '0.0.0.0',
			undefined,
			{ probeState: config.probeState },
		);

		// Forward GUI events from EventBus to the client as JSON text frames
		this.eventBus.subscribe('gui.update', (payload) => {
			this.clientTransport.sendJsonToClient({ type: 'gui.update', payload });
		});
		this.eventBus.subscribe('gui.notification', (payload) => {
			this.clientTransport.sendJsonToClient({ type: 'gui.notification', payload });
		});
		this.eventBus.subscribe('subagent.ui.send', (payload) => {
			this.clientTransport.sendJsonToClient({ type: 'ui.payload', payload: payload.payload });
		});

		// Route UI button responses back to the waiting SubagentSession
		this.eventBus.subscribe(
			'subagent.ui.response',
			(payload: {
				sessionId: string;
				response: { requestId: string; selectedOptionId?: string };
			}) => {
				const { requestId, selectedOptionId } = payload.response;
				if (!requestId || !selectedOptionId) return;

				const session = this.agentRouter.findSessionByRequestId(requestId);
				if (!session) return;

				const option = session.resolveOption(requestId, selectedOptionId);
				const answerText = option?.label ?? selectedOptionId;
				session.trySendToSubagent(answerText);
			},
		);

		// Set up tool executor
		this.toolExecutor = this.createToolExecutor(config.initialAgent);

		if (allInitialTools.length) {
			this.toolExecutor.register(allInitialTools);
		}

		// Set up agent router
		this.agentRouter = new AgentRouter(
			this.sessionManager,
			this.eventBus,
			this.hooks,
			this.conversationContext,
			this.transport,
			this.clientTransport,
			config.model,
			() => this.directiveManager.getSessionSuffix(),
			behaviorTools,
			{
				onMessage: (toolCallId, msg) => this.handleSubagentMessage(toolCallId, msg),
				onSessionEnd: (toolCallId) => this.interactionMode.deactivate(toolCallId),
			},
		);
		this.agentRouter.registerAgents(config.agents);
		this.agentRouter.setInitialAgent(config.initialAgent);

		// Set up tool call router
		this.toolCallRouter = new ToolCallRouter({
			toolExecutor: this.toolExecutor,
			agentRouter: this.agentRouter,
			conversationContext: this.conversationContext,
			notificationQueue: this.notificationQueue,
			transcriptManager: this.transcriptManager,
			subagentConfigs: this.subagentConfigs,
			sendToolResult: (result) => {
				// Generation fence: a completion for a call issued on a stranded
				// dial must not be sent into the replacement session — the new
				// generation never made that call.
				const issuedGen = this._toolCallGens.get(result.id);
				this._toolCallGens.delete(result.id);
				const gen = (this.transport as { currentDialGen?: number }).currentDialGen;
				if (issuedGen !== undefined && gen !== undefined && issuedGen !== gen) {
					this.log(`Dropped stale tool result ${result.id} (issued gen ${issuedGen}, now ${gen})`);
					return;
				}
				this.transport.sendToolResult(result);
			},
			transfer: (toAgent) => this.transfer(toAgent),
			reportError: (component, error) => this.reportError(component, error),
			log: (msg) => this.log(msg),
		});
	}

	/**
	 * Point-in-time send-path diagnostics; safe to sample on any tick.
	 *
	 * `upstream`/`transportGeneration` are null on transports that do not report
	 * diagnostics (injected fakes, other providers) — null means unobserved,
	 * never zero. `echoSuppressed` is session-owned: the guard is private, and
	 * suppressed frames never reach the transport counters.
	 */
	getDiagnostics(): VoiceSessionDiagnostics {
		const t = this.transport.getDiagnostics?.();
		return {
			upstream: t?.upstream ?? null,
			transportGeneration: t?.transportGeneration ?? null,
			echoSuppressed: this.echoGuard?.suppressedCount ?? 0,
		};
	}

	/**
	 * Queue a short spoken update for the user.
	 * Delivered immediately when possible, otherwise after the current turn.
	 */
	notifyBackground(
		text: string,
		options?: { priority?: 'normal' | 'high'; label?: 'SUBAGENT UPDATE' | 'SUBAGENT QUESTION' },
	): void {
		const label = options?.label ?? 'SUBAGENT UPDATE';
		this.notificationQueue.sendOrQueue(
			[{ role: 'user', parts: [{ text: `[${label}]: ${text}` }] }],
			true,
			{ priority: options?.priority ?? 'normal' },
		);
	}

	/** Start the client WebSocket server and connect to the LLM transport. */
	async start(): Promise<void> {
		await this.sttProvider?.start();
		await this.shadowSttProvider?.start();
		await this.memoryCacheManager?.refresh();

		// Restore behavior presets from structured directives (deterministic lookup)
		if (this.config.memory && this.behaviorManager) {
			try {
				const directives = await this.config.memory.store.getDirectives(this.config.userId);
				const restored: string[] = [];
				for (const [key, presetName] of Object.entries(directives)) {
					if (this.behaviorManager.restorePreset(key, presetName)) {
						restored.push(key);
					}
				}
				if (restored.length > 0) {
					this.log(`Restored behavior presets from directives: ${restored.join(', ')}`);
				}
			} catch {
				// Best-effort — directive loading failure is non-fatal
			}
		}

		this.log('Starting WS server...');
		await this.clientTransport.start();
		this.log('WS server ready. Connecting to LLM transport...');
		this.sessionManager.transitionTo('CONNECTING');
		if (this.config.transport) {
			// Pre-constructed transport — already configured, just connect
			await this.transport.connect();
		} else {
			// Default Gemini transport — pass config for backward compatibility
			await this.transport.connect({
				auth: { type: 'api_key', apiKey: this.config.apiKey },
				model: this.config.geminiModel ?? 'gemini-live-2.5-flash-preview',
			});
		}
		this.log('LLM transport connected and setup complete');
	}

	/** Gracefully shut down: disconnect Gemini, stop the WebSocket server, transition to CLOSED. */
	async close(_reason = 'normal'): Promise<void> {
		this.log(
			`close() called (reason=${_reason}, state=${this.sessionManager.state}, stack=${new Error().stack?.split('\n')[2]?.trim()})`,
		);

		// Drop any queued background notifications — session is ending
		this.notificationQueue.clear();

		// Flush any buffered transcription before closing
		this.transcriptManager.flush();

		// Fire turn end if we're mid-turn
		if (this.turnId > 0) {
			this.eventBus.publish('turn.end', {
				sessionId: this.config.sessionId,
				turnId: `turn_${this.turnId}`,
			});
		}

		// Final memory extraction before closing
		if (this.memoryDistiller) {
			this.log('Running final memory extraction...');
			try {
				await this.memoryDistiller.forceExtract();
				this.log('Final memory extraction complete');
			} catch {
				this.log('Final memory extraction failed (best-effort)');
			}
		}

		await this.sttProvider?.stop();
		await this.shadowSttProvider?.stop();
		await this.transport.disconnect();
		await this.clientTransport.stop();

		if (this.sessionManager.state !== 'CLOSED') {
			this.sessionManager.transitionTo('CLOSED');
		}

		this.eventBus.clear();
	}

	/** Transfer the active session to a different agent (reconnects with new config). */
	async transfer(toAgent: string): Promise<void> {
		this.log(`Transferring to agent "${toAgent}"...`);
		await this.agentRouter.transfer(toAgent);
		this.log(`Transfer to "${toAgent}" complete`);

		// Update tool executor with new agent's tools
		const agent = this.agentRouter.activeAgent;
		this.toolExecutor = this.createToolExecutor(agent.name);
		const behaviorTools = this.behaviorManager?.tools ?? [];
		this.toolExecutor.register([...agent.tools, ...behaviorTools]);
		this.toolCallRouter.toolExecutor = this.toolExecutor;

		// Clear agent-scoped directives on transfer; session-scoped directives persist
		this.directiveManager.clearAgent();

		// Send the new agent's greeting if configured
		if (this._clientConnected) {
			this.sendGreeting();
		}
	}

	private createToolExecutor(agentName: string): ToolExecutor {
		return new ToolExecutor(
			this.hooks,
			this.eventBus,
			this.config.sessionId,
			agentName,
			(msg) => this.clientTransport.sendJsonToClient(msg),
			(key, value, scope) => this.directiveManager.set(key, value, scope),
		);
	}

	// --- Audio fast-path (no EventBus) ---

	private handleAudioFromClient(data: Buffer): void {
		if (this.sessionManager.isActive) {
			// EchoGuard (sutando-meeting#127): an inbound chunk whose energy envelope
			// tracks recently PLAYED audio is our own speaker loopback — drop it here
			// so neither the model nor STT ever hears it (phantom-command root fix).
			if (this.echoGuard?.check(data, this.transport.audioFormat.inputSampleRate).suppress) {
				return;
			}
			const base64 = data.toString('base64');
			this.transport.sendAudio(base64);
			this.sttProvider?.feedAudio(base64);
			this.shadowSttProvider?.feedAudio(base64);
		}
	}

	private handleAudioOutput(data: string): void {
		this.notificationQueue.markAudioReceived();
		if (this.turnFirstAudioAt === null) {
			this.turnFirstAudioAt = Date.now();
		}
		const buffer = Buffer.from(data, 'base64');
		// EchoGuard reference: remember what we are playing so inbound echo of it
		// can be recognized (and suppressed) at handleAudioFromClient.
		this.echoGuard?.feedReference(buffer, this.transport.audioFormat.outputSampleRate);
		this.clientTransport.sendAudioToClient(buffer);
	}

	// --- Gemini event handlers ---

	private handleSetupComplete(_sessionId: string): void {
		this.log(`Gemini setup complete (clientConnected=${this._clientConnected})`);
		if (this.sessionManager.state === 'CONNECTING') {
			this.sessionManager.transitionTo('ACTIVE');
		}
		// During transfer or reconnect, the caller handles post-connect logic — skip greeting here.
		// CLOSED→reconnect path uses _skipNextGreeting because the legal CLOSED→CONNECTING
		// transition can't be distinguished from an initial connect by state alone.
		if (
			this.sessionManager.state === 'TRANSFERRING' ||
			this.sessionManager.state === 'RECONNECTING' ||
			this._skipNextGreeting
		) {
			this._skipNextGreeting = false;
			return;
		}
		if (this._clientConnected) {
			this.sendGreeting();
		}
	}

	private handleTurnComplete(): void {
		// ORDERING: STT commit + cleanup BEFORE turnId increment.
		// This ensures commit(turnId) uses the turn being completed, and
		// stale-drop (turnId < this.turnId) correctly rejects prior-turn results.
		if (this.sttProvider) {
			if (!this._commitFiredForTurn) {
				this.stampSttCommit(this.turnId);
				this.sttProvider.commit(this.turnId); // Safety-net commit
			}
			this.sttProvider.handleTurnComplete();
			this._commitFiredForTurn = false;
		}

		this.transcriptManager.flush();
		this.turnId++;
		const turnIdStr = `turn_${this.turnId}`;
		this.log(`Turn complete: ${turnIdStr}`);
		this.eventBus.publish('turn.end', {
			sessionId: this.config.sessionId,
			turnId: turnIdStr,
		});
		this.clientTransport.sendJsonToClient({ type: 'turn.end', turnId: turnIdStr });

		// Fire onTurnLatency hook with best-effort total duration.
		// Minimum viable: measure from first Sutando audio output of the turn
		// until turn complete. This is Sutando's speak+wait time, not full
		// user→response latency — the true start requires a Gemini VAD signal
		// bodhi doesn't expose. Useful as a bounded-duration heuristic.
		if (this.turnFirstAudioAt !== null && this.hooks.onTurnLatency) {
			const totalE2EMs = Date.now() - this.turnFirstAudioAt;
			this.hooks.onTurnLatency({
				sessionId: this.config.sessionId,
				turnId: turnIdStr,
				segments: { totalE2EMs },
			});
		}
		this.turnFirstAudioAt = null;

		// Notify active agent
		const agent = this.agentRouter.activeAgent;
		if (agent.onTurnCompleted) {
			const transcript = this.conversationContext.items
				.slice(-5)
				.map((i) => `[${i.role}]: ${i.content}`)
				.join('\n');

			agent.onTurnCompleted(
				{
					sessionId: this.config.sessionId,
					agentName: agent.name,
					injectSystemMessage: (text) =>
						this.conversationContext.addAssistantMessage(`[system] ${text}`),
					getRecentTurns: (count = 10) => [...this.conversationContext.items].slice(-count),
					getMemoryFacts: () => this.memoryCacheManager?.facts ?? [],
				},
				transcript,
			);
		}

		// Trigger memory extraction (every N turns) and refresh cache
		if (this.memoryDistiller) {
			this.memoryDistiller.onTurnEnd();
			this.memoryCacheManager?.refresh();
		}

		// Reinforce active directives so Gemini doesn't drift
		this.reinforceDirectives();

		// Reset audio flag and flush one queued notification (skips if interrupted)
		this.notificationQueue.onTurnComplete();
	}

	/** Inject all active directives into the LLM's context to prevent behavioral drift. */
	private reinforceDirectives(): void {
		const text = this.directiveManager.getReinforcementText();
		if (!text) return;
		this.log(`Reinforcing directives: ${text.slice(0, 120)}...`);
		this.sendSyntheticContent([{ role: 'user', text }], true, 'directive-reinforcement');
	}

	/** Send the active agent's greeting prompt to the LLM to trigger a spoken greeting. */
	private sendGreeting(): void {
		const agent = this.agentRouter.activeAgent;
		if (!agent.greeting) return;
		this.log(`Sending greeting for agent "${agent.name}"`);
		this.notificationQueue.resetAudio();

		// Inject stored memory facts so the LLM knows the user from the first turn
		const cachedFacts = this.memoryCacheManager?.facts ?? [];
		if (cachedFacts.length > 0) {
			const summary = cachedFacts.map((f) => `- ${f.content}`).join('\n');
			const memoryText = `[MEMORY — what you already know about this user from previous sessions]\n${summary}`;
			if (
				this.sendSyntheticContent([{ role: 'user', text: memoryText }], true, 'greeting-memory')
			) {
				this.log(`Injected ${cachedFacts.length} memory facts`);
			}
		}

		// Prepend session directives so the greeting response respects user preferences (e.g. pacing)
		const directiveSuffix = this.directiveManager.getSessionSuffix();
		const greetingText = directiveSuffix
			? `${directiveSuffix}\n\n${agent.greeting}`
			: agent.greeting;
		this.sendSyntheticContent([{ role: 'user', text: greetingText }], true, 'greeting');
	}

	private handleInterrupted(): void {
		this.log('Interrupted by user');
		// Server-side VAD detected user speech over model output — fresh
		// user evidence by definition (and generation-fenced at ingress).
		this.handleUserSpeechEvidence();
		this.sttProvider?.handleInterrupted();
		this.notificationQueue.resetAudio();
		this.notificationQueue.markInterrupted();
		this.transcriptManager.flush();
		// Reset the turn-start marker so the NEXT turn gets a fresh
		// `turnFirstAudioAt` when its first Sutando audio chunk arrives.
		// Without this, turn N (interrupted) keeps the marker set, and
		// turn N+1's handleAudioOutput `if (this.turnFirstAudioAt === null)`
		// guard skips the update → turn N+1 reports latency measured from
		// turn N's first audio chunk (stale) in handleTurnComplete.
		this.turnFirstAudioAt = null;
		this.eventBus.publish('turn.interrupted', {
			sessionId: this.config.sessionId,
			// Same 1-based id turn.start and turn.end use. handleTurnComplete
			// increments before publishing and turn.start adds one, so the live
			// counter is one BEHIND the turn everything else is naming — an
			// interrupt and the end of the same turn reported different ids.
			turnId: `turn_${this.turnId + 1}`,
		});
		this.clientTransport.sendJsonToClient({ type: 'turn.interrupted' });
	}

	/** Handle a message from an interactive subagent (question, progress update). */
	private handleSubagentMessage(toolCallId: string, msg: SubagentMessage): void {
		if (msg.type === 'result') return; // Results are delivered by ToolCallRouter

		if (msg.blocking) {
			this.interactionMode.activate(toolCallId);
		}

		const label = msg.type === 'question' ? 'SUBAGENT QUESTION' : 'SUBAGENT UPDATE';
		this.notificationQueue.sendOrQueue(
			[{ role: 'user', parts: [{ text: `[${label}]: ${msg.text}` }] }],
			true,
			{ priority: msg.blocking ? 'high' : 'normal' },
		);
	}

	private handleGroundingMetadata(metadata: Record<string, unknown>): void {
		this.clientTransport.sendJsonToClient({ type: 'grounding', payload: metadata });
	}

	private handleGoAway(timeLeft: string): void {
		this.log(`GoAway from Gemini (timeLeft=${timeLeft})`);
		this.eventBus.publish('session.goaway', {
			sessionId: this.config.sessionId,
			timeLeft,
		});

		// Ignore late-arriving GoAway from a transport torn down during a
		// previous reconnect. Only ACTIVE → RECONNECTING is a valid
		// transition; any other state (CLOSED in particular) throws an
		// unhandled SessionError from transitionTo below.
		if (this.sessionManager.state !== 'ACTIVE') {
			this.log(`GoAway ignored — sessionManager state is ${this.sessionManager.state}, not ACTIVE`);
			return;
		}

		// Initiate reconnection
		const handle = this.sessionManager.resumptionHandle;
		if (handle) {
			this.sessionManager.transitionTo('RECONNECTING');
			this.clientTransport.startBuffering();

			// Wrap the reconnect promise in a deadline race. Without this, an
			// ECONNRESET on the in-flight reconnect WebSocket dial leaves the
			// transport.reconnect() promise pending forever — the session
			// stays in RECONNECTING with no transition to ACTIVE or CLOSED,
			// requiring manual `launchctl kickstart` to recover. Observed live
			// 2026-05-01: 5+ minutes of stuck RECONNECTING after a transient
			// ECONNRESET hit while already mid-reconnect.
			// Resume vs replay (sutando-meeting#129): when the transport supports
			// session resumption (Gemini), the stored handle restores the FULL
			// server-side context — replaying history on top is not just redundant,
			// it is the re-answer bug: replayHistory() sends the transcript as
			// realtime INPUT, which the model treats as fresh user speech and
			// answers again (verbatim repeats + topic regression after every
			// ~9-min GoAway rotation). Replay only for transports that cannot
			// resume (OpenAI), where it is the sole recovery mechanism.
			const reconnectPromise = this.transport.reconnect(
				this.transport.capabilities.sessionResumption
					? {}
					: { conversationHistory: this.conversationContext.toReplayContent() },
			);
			let deadlineHandle: ReturnType<typeof setTimeout> | undefined;
			const deadlinePromise = new Promise<never>((_, reject) => {
				deadlineHandle = setTimeout(
					() =>
						reject(
							new Error(
								`Reconnect timed out after ${VoiceSession.RECONNECT_DEADLINE_MS}ms — transitioning to CLOSED so caller can re-arm`,
							),
						),
					VoiceSession.RECONNECT_DEADLINE_MS,
				);
			});

			Promise.race([reconnectPromise, deadlinePromise])
				.finally(() => {
					if (deadlineHandle) clearTimeout(deadlineHandle);
				})
				.then(() => {
					if (this.sessionManager.state === 'CLOSED') {
						this.log('Reconnect succeeded but session already CLOSED — skipping ACTIVE transition');
						this.clientTransport.stopBuffering();
						return;
					}
					const buffered = this.clientTransport.stopBuffering();
					for (const chunk of buffered) {
						this.transport.sendAudio(chunk.toString('base64'));
					}
					this.sessionManager.transitionTo('ACTIVE');
				})
				.catch((err) => {
					this.clientTransport.stopBuffering();
					this.reportError('reconnect', err);
					if (this.sessionManager.state !== 'CLOSED') {
						this.sessionManager.transitionTo('CLOSED');
					}
				});
		}
	}

	private handleResumptionUpdate(handle: string, resumable: boolean): void {
		// Mirror the transport's internal handle state (PR #24 review): a
		// non-resumable update invalidates the handle on BOTH sides. If the
		// session manager kept a stale handle here, handleGoAway would enter
		// the resume path while the transport reconnects fresh WITHOUT replay
		// — dropping all context. With the handle cleared, handleGoAway skips
		// the resume path and recovery flows through the CLOSED → fresh
		// connect branch, which injects condensed history.
		if (resumable) {
			this.sessionManager.updateResumptionHandle(handle);
		} else {
			this.sessionManager.clearResumptionHandle();
		}
	}

	// --- Client transport handlers ---

	private handleJsonFromClient(message: Record<string, unknown>): void {
		if (
			message.type === 'behavior.set' &&
			typeof message.key === 'string' &&
			typeof message.preset === 'string'
		) {
			this.behaviorManager?.handleClientSet(message.key, message.preset);
		} else if (message.type === 'ui.response' && message.payload) {
			this.eventBus.publish('subagent.ui.response', {
				sessionId: this.config.sessionId,
				response: message.payload as {
					requestId: string;
					selectedOptionId?: string;
					formData?: Record<string, unknown>;
				},
			});
		} else if (message.type === 'file_upload' && message.data) {
			const data = message.data as { base64: string; mimeType: string; fileName?: string };
			this.handleFileUpload(data.base64, data.mimeType, data.fileName);
		} else if (message.type === 'text_input' && typeof message.text === 'string') {
			this.handleTextInput(message.text);
		} else {
			// Not a built-in: the host may own it (voice.retryUpstream, ...).
			this.config.onClientCommand?.(message);
		}
	}

	/** Push one host-owned JSON frame to the attached client (no-op with none
	 *  attached) — the outbound half of the host's client protocol. */
	sendJsonToClient(message: Record<string, unknown>): void {
		this.clientTransport.sendJsonToClient(message);
	}

	private handleFileUpload(base64: string, mimeType: string, fileName?: string): void {
		if (!this.sessionManager.isActive) return;

		// Send image/document to the LLM as inline data
		this.transport.sendFile(base64, mimeType);

		// Record in conversation context
		this.conversationContext.addUserMessage(`[Uploaded file: ${fileName ?? 'file'}]`);
	}

	private handleTextInput(text: string): void {
		if (!this.sessionManager.isActive || !text.trim()) return;

		// Typed text is direct user action — the strongest freshness evidence.
		this.handleUserSpeechEvidence();
		const trimmed = text.trim();

		// Relay to interactive subagent if one is waiting for input.
		// Use trySendToSubagent for race safety — a UI button response may
		// have already resolved the waiting ask_user.
		const activeId = this.interactionMode.getActiveToolCallId();
		if (activeId) {
			const session = this.agentRouter.getSubagentSession(activeId);
			if (session?.trySendToSubagent(trimmed)) {
				this.interactionMode.deactivate(activeId);
			}
		}

		// Always send to main LLM so it stays informed of user messages
		this.transport.sendContent([{ role: 'user', text: trimmed }], true);
		this.conversationContext.addUserMessage(trimmed);
	}

	/** Compute what THIS session's transport actually supports — never a
	 *  static attestation. Armed-mode consumers must gate on this. */
	getRecoveryCapabilities(): RecoveryCapabilities {
		const t = this.transport as Partial<RecoveryTransportOps>;
		const native =
			typeof t.abortIncumbent === 'function' &&
			typeof t.currentDialGen === 'number' &&
			typeof t.currentTransportGeneration === 'number';
		return native ? RECOVERY_CAPABILITIES : DEGRADED_RECOVERY_CAPABILITIES;
	}

	isSyntheticHoldActive(): boolean {
		return this._syntheticHoldActive;
	}

	/** Fresh user evidence — built-in input transcription, external STT final,
	 *  VAD barge-in, or typed text. Post-boundary by causality: transport paths
	 *  are generation-fenced at ingress, and recoverUpstream resets the
	 *  external STT utterance at the boundary. Releases the hold exactly once. */
	/** Record the dial generation a turn's STT capture belongs to, and bound the
	 *  map — only the current and immediately preceding turn are ever consulted. */
	private stampSttCommit(turnId: number): void {
		const gen = (this.transport as { currentDialGen?: number }).currentDialGen;
		if (gen === undefined) return;
		this._sttCommitGens.set(turnId, gen);
		for (const t of this._sttCommitGens.keys()) {
			if (t < turnId - 2) this._sttCommitGens.delete(t);
		}
	}

	/** True when this transcript was captured on a dial that a recovery has since
	 *  stranded. Completing after the boundary does NOT place the speech after it:
	 *  a batch provider's request is issued at commit and resolves whenever the
	 *  API returns, so an utterance from before the boundary can land after it. */
	private sttCaptureIsStale(turnId: number | undefined): boolean {
		if (turnId === undefined) return false; // streaming VAD auto-commit: no capture stamp to fence on
		const capturedGen = this._sttCommitGens.get(turnId);
		const gen = (this.transport as { currentDialGen?: number }).currentDialGen;
		return capturedGen !== undefined && gen !== undefined && capturedGen !== gen;
	}

	private handleUserSpeechEvidence(): void {
		if (!this._syntheticHoldActive) return;
		this._syntheticHoldActive = false;
		this.notificationQueue.setHeld(false);
		this.log('Synthetic hold released by fresh user speech');
	}

	/** THE chokepoint for synthetic (non-user-initiated) model input: greeting,
	 *  memory/context injection, directive reinforcement, shadow-STT
	 *  correction. The recovery hold silences all of it until fresh user
	 *  evidence — an automatic path must not trigger autonomous output.
	 *  Returns false when suppressed so callers can skip dependent work. */
	private sendSyntheticContent(
		turns: Parameters<LLMTransport['sendContent']>[0],
		turnComplete: boolean,
		origin: string,
	): boolean {
		if (this._syntheticHoldActive) {
			this.log(`Recovery hold suppressed synthetic send (${origin})`);
			return false;
		}
		this.transport.sendContent(turns, turnComplete);
		return true;
	}

	/** Epoch-keyed reconnect boundary: exactly one event per generation, and
	 *  stale generations arriving after a newer boundary are rejected outright.
	 *  Partial transcripts are flushed (committed) rather than merged into the
	 *  next turn; late deltas from the dead generation are rejected by the
	 *  transport's ingress fencing. */
	/** The published `transportGeneration` field carries the DIAL generation
	 *  (its only caller passes attemptEpoch); the name predates the split. */
	private beginReconnectBoundary(reason: string, transportGeneration: number): void {
		if (this._lastBoundaryGen !== null && transportGeneration <= this._lastBoundaryGen) return;
		this._lastBoundaryGen = transportGeneration;
		this.transcriptManager.flush();
		this.eventBus.publish('session.reconnectBoundary', {
			sessionId: this.config.sessionId,
			reason,
			transportGeneration,
		});
		this.log(`Reconnect boundary (${reason}) at generation ${transportGeneration}`);
	}

	/** Atomic upstream recovery (design-voice-active-silence-recovery.md):
	 *  hold -> strand incumbent -> CLOSED -> boundary -> clear resumption
	 *  handle -> injection-free redial. Single-flight; the latch is installed
	 *  BEFORE any synchronous event publication, so a reentrant call from a
	 *  CLOSED/boundary subscriber receives this attempt, never a second one.
	 *  Throws on transports without the recovery primitives — check
	 *  getRecoveryCapabilities().recoverUpstream first. */
	recoverUpstream(args: RecoverUpstreamArgs): RecoverUpstreamResult {
		if (this._recoveryInFlight) return this._recoveryInFlight;
		const transport = this.transport as unknown as Partial<RecoveryTransportOps>;
		if (
			typeof transport.abortIncumbent !== 'function' ||
			typeof transport.currentDialGen !== 'number'
		) {
			throw new Error(
				'recoverUpstream: transport lacks the recovery primitives (getRecoveryCapabilities().recoverUpstream is false)',
			);
		}
		// --- Pre-publication phase: nothing below emits an event, so reentry
		// is impossible until the latch is set. Hold first (the design's
		// hold-first sequence): no synthetic send can slip between the strand
		// and the gate.
		if (args.holdSyntheticUntilFreshSpeech) {
			this._syntheticHoldActive = true;
			this.notificationQueue.setHeld(true);
		}
		this._skipNextGreeting = true;
		// Strand pending session-level dial continuations (client-reconnect
		// context injection, transport-close redials) alongside the transport
		// callbacks — both fences must advance together.
		this._dialGen++;
		// Cut the in-flight external-STT utterance at the boundary so a
		// pre-recovery transcript can't cross it as fresh evidence.
		this.sttProvider?.handleInterrupted();
		const incumbentClosed = transport.abortIncumbent();
		// The rest of this method runs in one synchronous frame, so the
		// recovery dial deterministically takes the next dial generation.
		// The lifecycle test pins this: attempt event att_<attemptEpoch>.
		const attemptEpoch = transport.currentDialGen + 1;
		this.log(
			`recoverUpstream(${args.reason}): incumbent stranded, dialing attempt ${attemptEpoch}`,
		);
		let resolveActivated!: () => void;
		let rejectActivated!: (err: unknown) => void;
		const activated = new Promise<void>((res, rej) => {
			resolveActivated = res;
			rejectActivated = rej;
		});
		const result: RecoverUpstreamResult = { attemptEpoch, activated, incumbentClosed };
		this._recoveryInFlight = result;
		// --- Publication phase: subscribers may reenter; the latch above
		// hands them this attempt.
		if (this.sessionManager.state !== 'CLOSED') {
			this.sessionManager.transitionTo('CLOSED');
		}
		this.beginReconnectBoundary(args.reason, attemptEpoch);
		this.sessionManager.clearResumptionHandle();
		(async () => {
			this.sessionManager.reset();
			this.sessionManager.transitionTo('CONNECTING');
			if (this.config.transport) {
				await (transport as RecoveryTransportOps).connect();
			} else {
				await (transport as RecoveryTransportOps).connect({
					auth: { type: 'api_key', apiKey: this.config.apiKey },
					model: this.config.geminiModel ?? 'gemini-live-2.5-flash-preview',
				});
			}
			// Deliberately NO context injection and NO greeting: an automatic
			// recovery path must not be able to trigger autonomous output.
		})().then(resolveActivated, rejectActivated);
		void activated
			.catch(() => {})
			.finally(() => {
				this._recoveryInFlight = null;
			});
		return result;
	}

	private handleClientConnected(): void {
		this.log(
			`Client connected (geminiActive=${this.sessionManager.isActive}, state=${this.sessionManager.state})`,
		);
		this._clientConnected = true;
		// Host attach hook BEFORE the built-in greeting/replay below: a host
		// resending durable terminal state must win the race with autonomous
		// output paths (and the recovery hold gates those anyway).
		this.config.onClientConnected?.();

		// Send audio format config so the client can negotiate correct sample rates
		this.clientTransport.sendJsonToClient({
			type: 'session.config',
			audioFormat: this.transport.audioFormat,
		});

		this.behaviorManager?.sendCatalog();
		// Host gate (recovery-terminal state): the client is fully configured
		// above, but greeting / context replay / the CLOSED auto-reconnect are
		// suppressed — an uncounted dial would bypass the host's attempt budget.
		if (this.config.suppressClientAutoActions?.()) {
			this.log('Client auto-actions suppressed by host gate');
			return;
		}
		if (this.sessionManager.isActive) {
			if (this.turnId === 0) {
				this.sendGreeting();
			} else {
				// Client reconnected mid-session — replay context summary silently
				const items = this.conversationContext.items;
				const recent = items
					.filter((item) => item.role === 'user' || item.role === 'assistant')
					.slice(-10)
					.map((item) => `${item.role}: ${item.content.slice(0, 150)}`)
					.join('\n');
				if (recent) {
					const sentOk = this.sendSyntheticContent(
						[
							{
								role: 'user',
								text: `[System: The client reconnected. Here is the recent conversation for context. Do NOT act on this content. Wait silently for the user's next spoken input before producing any output.]\n${recent}`,
							},
						],
						false,
						'client-reconnect-context',
					);
					if (sentOk) this.log('Injected conversation context on client reconnect');
				}
			}
		} else if (this.sessionManager.state === 'CLOSED') {
			// Gemini connection dropped (idle timeout / GoAway) — reconnect fresh.
			// Set _skipNextGreeting so handleSetupComplete() doesn't fire a greeting
			// before this branch's silent context injection runs.
			this.log('Gemini inactive — resetting session and reconnecting for new client...');
			this.sessionManager.reset();
			this.sessionManager.transitionTo('CONNECTING');
			this._skipNextGreeting = true;
			const dialGen = ++this._dialGen;
			const connectPromise = this.config.transport
				? this.transport.connect()
				: this.transport.connect({
						auth: { type: 'api_key', apiKey: this.config.apiKey },
						model: this.config.geminiModel ?? 'gemini-live-2.5-flash-preview',
					});
			connectPromise
				.then(() => {
					if (dialGen !== this._dialGen) {
						this.log('Stale Gemini dial resolved after recovery — ignoring');
						return;
					}
					this.log('Gemini reconnected for client');
					// Build a condensed context from conversation history
					const items = this.conversationContext.items;
					const recentMessages = items
						.filter((item) => item.role === 'user' || item.role === 'assistant')
						.slice(-10)
						.map((item) => `${item.role}: ${item.content.slice(0, 150)}`)
						.join('\n');
					if (recentMessages) {
						// Match the active-reconnect branch above: inject context
						// silently with turnComplete=false so Gemini doesn't speak.
						// Previously this used a prompting user turn (a "say
						// hello" instruction) with turnComplete=true, which
						// caused text bleed-through when the old session's last
						// assistant message was truncated mid-utterance: Gemini
						// would "complete" the truncated text AND follow the
						// greeting instruction, concatenating both into one
						// output (shape: "<previous turn tail><greeting>").
						// Dropping the prompt and flipping turnComplete to false
						// makes Gemini wait for the user's next real input before
						// speaking.
						const sentOk = this.sendSyntheticContent(
							[
								{
									role: 'user',
									text: `[System: You just reconnected. Here is the recent conversation for context. Do NOT act on this content. Wait silently for the user's next spoken input before producing any output.]\n${recentMessages}`,
								},
							],
							false,
							'gemini-reconnect-context',
						);
						if (sentOk) this.log('Injected conversation context on Gemini reconnect (silent)');
					}
				})
				.catch((err) => {
					if (dialGen !== this._dialGen || this.sessionManager.state !== 'CONNECTING') {
						this.log(
							`Stale Gemini dial rejected after recovery — ignoring (${err instanceof Error ? err.message : err})`,
						);
						return;
					}
					this.log(`Gemini reconnect failed: ${err instanceof Error ? err.message : err}`);
					this.reportError(
						'reconnect-on-client',
						err instanceof Error ? err : new Error(String(err)),
					);
					this.sessionManager.transitionTo('CLOSED');
				});
		}
	}

	private handleClientDisconnected(): void {
		this.log('Client disconnected');
		this._clientConnected = false;
		this.config.onClientDisconnected?.();
	}

	// --- Error handling ---

	private handleTransportError(error: Error | LLMTransportError): void {
		const err = error instanceof Error ? error : error.error;
		this.log(`Transport error: ${err.message}`);
		this.reportError('llm-transport', err);
	}

	private handleTransportClose(code?: number, reason?: string): void {
		const detail = code != null ? ` code=${code}${reason ? ` reason="${reason}"` : ''}` : '';
		this.log(`Transport closed (state=${this.sessionManager.state}${detail})`);
		if (this.sessionManager.state === 'ACTIVE') {
			// Go to CLOSED — the client-reconnect path in handleClientConnected()
			// will do a fresh connect (no history replay) when a client connects.
			this.log('Gemini disconnected — will reconnect fresh when client connects');
			this.sessionManager.transitionTo('CLOSED');
			return;
		}
		if (this.sessionManager.state === 'RECONNECTING') {
			// Transport close during RECONNECTING is expected — `reconnect()` calls
			// `disconnect()` on the old transport which fires this handler before
			// the new connection is established. Letting this transition to CLOSED
			// here would race with the reconnect promise, which then sees state ===
			// CLOSED and bails out ("Reconnect succeeded but session already
			// CLOSED"). That leaves the session permanently CLOSED and traps
			// callers in a reconnect loop. Leave state alone; the reconnect
			// promise handler owns the ACTIVE transition on success, and the
			// catch path owns transitioning to CLOSED on failure.
			this.log(
				'Transport close during RECONNECTING — state left unchanged, awaiting reconnect promise',
			);
			return;
		}
		if (this.sessionManager.state === 'CONNECTING') {
			// A dial whose socket died (DNS failure, refused, dropped). The SDK's
			// connect promise may never settle, so this close is the only signal —
			// go back to CLOSED so the next client connect redials.
			this._dialGen++;
			this.log('Transport closed during CONNECTING — dial failed; back to CLOSED for redial');
			this.sessionManager.transitionTo('CLOSED');
			return;
		}
	}

	private reportError(component: string, error: unknown): void {
		const err = error instanceof Error ? error : new Error(String(error));
		if (this.hooks.onError) {
			this.hooks.onError({
				sessionId: this.config.sessionId,
				component,
				error: err,
				severity: 'error',
			});
		}
	}

	/** Compact diagnostic log: HH:MM:SS.mmm [VoiceSession] message */
	private log(msg: string): void {
		const t = new Date().toISOString().slice(11, 23);
		console.log(`${t} [VoiceSession] ${msg}`);
	}
}
