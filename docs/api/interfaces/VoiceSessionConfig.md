[bodhi-realtime-agent](../index.md) / VoiceSessionConfig

# Interface: VoiceSessionConfig

Defined in: [core/voice-session.ts:39](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L39)

Configuration for creating a VoiceSession.

## Properties

### agents

> **agents**: [`MainAgent`](MainAgent.md)[]

Defined in: [core/voice-session.ts:47](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L47)

All agents available in this session.

***

### apiKey

> **apiKey**: `string`

Defined in: [core/voice-session.ts:45](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L45)

Google API key for the Gemini Live API (used when no transport is provided).

***

### artifactRegistry?

> `optional` **artifactRegistry**: `object`

Defined in: [core/voice-session.ts:101](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L101)

Optional per-session artifact registry for cross-tool binary sharing (images, documents).

#### dispose()

> **dispose**(): `void`

##### Returns

`void`

#### store()

> **store**(`base64`, `mimeType`, `description`, `source?`, `fileName?`): `string`

##### Parameters

###### base64

`string`

###### mimeType

`string`

###### description

`string`

###### source?

`string`

###### fileName?

`string`

##### Returns

`string`

***

### artifactStore?

> `optional` **artifactStore**: [`ArtifactStore`](ArtifactStore.md)

Defined in: [core/voice-session.ts:93](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L93)

When provided, agents/tools can persist artifacts (images, docs, etc.) via session.workspace.saveArtifact().

***

### behaviors?

> `optional` **behaviors**: [`BehaviorCategory`](BehaviorCategory.md)[]

Defined in: [core/voice-session.ts:82](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L82)

Behavior categories for dynamic runtime tuning (speech speed, verbosity, etc.).

***

### clientSender?

> `optional` **clientSender**: [`SessionClientSender`](SessionClientSender.md)

Defined in: [core/voice-session.ts:58](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L58)

Sender for all output to the client. The server owns the socket and feeds input
via feedAudioFromClient / feedJsonFromClient and notifyClientConnected / notifyClientDisconnected.

***

### compressionConfig?

> `optional` **compressionConfig**: `object`

Defined in: [core/voice-session.ts:72](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L72)

Context window compression thresholds.

#### targetTokens

> **targetTokens**: `number`

#### triggerTokens

> **triggerTokens**: `number`

***

### conversationHistoryStore?

> `optional` **conversationHistoryStore**: [`ConversationHistoryStore`](ConversationHistoryStore.md)

Defined in: [core/voice-session.ts:91](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L91)

When provided, conversation items are persisted at turn boundaries and on session close.

***

### geminiModel?

> `optional` **geminiModel**: `string`

Defined in: [core/voice-session.ts:66](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L66)

LLM model name (e.g. "gemini-live-2.5-flash-preview").

***

### hooks?

> `optional` **hooks**: [`FrameworkHooks`](FrameworkHooks.md)

Defined in: [core/voice-session.ts:53](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L53)

Lifecycle hooks for observability.

***

### host?

> `optional` **host**: `string`

Defined in: [core/voice-session.ts:62](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L62)

Host for the local client WebSocket server (legacy/local mode).

***

### initialAgent

> **initialAgent**: `string`

Defined in: [core/voice-session.ts:49](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L49)

Name of the agent to activate on start.

***

### inputAudioTranscription?

> `optional` **inputAudioTranscription**: `boolean`

Defined in: [core/voice-session.ts:76](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L76)

Enable server-side transcription of user audio input (default: true).
 Has no effect when sttProvider is set (built-in is disabled automatically).
 Use false to disable all input transcription for privacy or cost control.

***

### listenTimeoutMs?

> `optional` **listenTimeoutMs**: `number`

Defined in: [core/voice-session.ts:64](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L64)

Listen timeout for local client WebSocket server startup (legacy/local mode).

***

### memory?

> `optional` **memory**: `object`

Defined in: [core/voice-session.ts:84](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L84)

Enable memory distillation. Extracts durable user facts from conversation and persists them.

#### store

> **store**: [`MemoryStore`](MemoryStore.md)

Where to persist extracted facts.

#### turnFrequency?

> `optional` **turnFrequency**: `number`

Extract every N turns (default: 5).

***

### model

> **model**: `LanguageModelV1`

Defined in: [core/voice-session.ts:68](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L68)

Vercel AI SDK model for subagent text generation.

***

### port?

> `optional` **port**: `number`

Defined in: [core/voice-session.ts:60](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L60)

Port for the local client WebSocket server (legacy/local mode).

***

### sessionId

> **sessionId**: `string`

Defined in: [core/voice-session.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L41)

Unique session identifier.

***

### speechConfig?

> `optional` **speechConfig**: `object`

Defined in: [core/voice-session.ts:70](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L70)

Voice configuration for Gemini's speech output.

#### voiceName?

> `optional` **voiceName**: `string`

***

### sttProvider?

> `optional` **sttProvider**: [`STTProvider`](STTProvider.md)

Defined in: [core/voice-session.ts:80](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L80)

External STT provider for user input transcription.
 When set, transport built-in transcription is automatically disabled.
 When omitted, the transport's built-in transcription is used.

***

### subagentConfigs?

> `optional` **subagentConfigs**: `Record`\<`string`, [`SubagentConfig`](SubagentConfig.md)\>

Defined in: [core/voice-session.ts:51](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L51)

Background subagent configs keyed by tool name.

***

### transport?

> `optional` **transport**: [`LLMTransport`](LLMTransport.md)

Defined in: [core/voice-session.ts:99](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L99)

Pre-constructed LLM transport. If provided, apiKey/geminiModel/speechConfig/compressionConfig are ignored.

***

### ttsProvider?

> `optional` **ttsProvider**: [`TTSProvider`](TTSProvider.md)

Defined in: [core/voice-session.ts:97](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L97)

External TTS provider for speech synthesis.
 When set, LLM is configured for text-mode responses.
 When omitted, LLM-native audio generation is used (default).

***

### userId

> **userId**: `string`

Defined in: [core/voice-session.ts:43](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L43)

User identifier (used for memory storage and history).
