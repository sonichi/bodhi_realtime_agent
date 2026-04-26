[bodhi-realtime-agent](../index.md) / GeminiLiveTransport

# Class: GeminiLiveTransport

Defined in: [transport/gemini-live-transport.ts:102](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L102)

WebSocket transport layer for the Gemini Live API.

Wraps the `@google/genai` SDK's live.connect() to manage the bidirectional
audio stream. Handles connection setup, message routing, tool declaration
conversion (Zod → JSON Schema), and session resumption.

Implements `LLMTransport` for provider-agnostic usage. The constructor
callback pattern is preserved for backward compatibility alongside the
LLMTransport callback properties.

## Implements

- [`LLMTransport`](../interfaces/LLMTransport.md)

## Constructors

### Constructor

> **new GeminiLiveTransport**(`config`, `callbacks`): `GeminiLiveTransport`

Defined in: [transport/gemini-live-transport.ts:165](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L165)

#### Parameters

##### config

[`GeminiTransportConfig`](../interfaces/GeminiTransportConfig.md)

##### callbacks

[`GeminiTransportCallbacks`](../interfaces/GeminiTransportCallbacks.md)

#### Returns

`GeminiLiveTransport`

## Properties

### audioFormat

> `readonly` **audioFormat**: [`AudioFormatSpec`](../interfaces/AudioFormatSpec.md)

Defined in: [transport/gemini-live-transport.ts:136](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L136)

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`audioFormat`](../interfaces/LLMTransport.md#audioformat)

***

### capabilities

> `readonly` **capabilities**: [`TransportCapabilities`](../interfaces/TransportCapabilities.md)

Defined in: [transport/gemini-live-transport.ts:125](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L125)

Static capabilities — read before connecting, used for orchestrator branching.

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`capabilities`](../interfaces/LLMTransport.md#capabilities)

***

### onAudioOutput()?

> `optional` **onAudioOutput**: (`base64Data`) => `void`

Defined in: [transport/gemini-live-transport.ts:146](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L146)

#### Parameters

##### base64Data

`string`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onAudioOutput`](../interfaces/LLMTransport.md#onaudiooutput)

***

### onClose()?

> `optional` **onClose**: (`code?`, `reason?`) => `void`

Defined in: [transport/gemini-live-transport.ts:155](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L155)

#### Parameters

##### code?

`number`

##### reason?

`string`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onClose`](../interfaces/LLMTransport.md#onclose)

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [transport/gemini-live-transport.ts:154](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L154)

#### Parameters

##### error

[`LLMTransportError`](../interfaces/LLMTransportError.md)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onError`](../interfaces/LLMTransport.md#onerror)

***

### onGoAway()?

> `optional` **onGoAway**: (`timeLeft`) => `void`

Defined in: [transport/gemini-live-transport.ts:157](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L157)

#### Parameters

##### timeLeft

`string`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onGoAway`](../interfaces/LLMTransport.md#ongoaway)

***

### onGroundingMetadata()?

> `optional` **onGroundingMetadata**: (`metadata`) => `void`

Defined in: [transport/gemini-live-transport.ts:159](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L159)

#### Parameters

##### metadata

`Record`\<`string`, `unknown`\>

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onGroundingMetadata`](../interfaces/LLMTransport.md#ongroundingmetadata)

***

### onInputTranscription()?

> `optional` **onInputTranscription**: (`text`) => `void`

Defined in: [transport/gemini-live-transport.ts:151](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L151)

#### Parameters

##### text

`string`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onInputTranscription`](../interfaces/LLMTransport.md#oninputtranscription)

***

### onInterrupted()?

> `optional` **onInterrupted**: () => `void`

Defined in: [transport/gemini-live-transport.ts:150](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L150)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onInterrupted`](../interfaces/LLMTransport.md#oninterrupted)

***

### onModelTurnStart()?

> `optional` **onModelTurnStart**: () => `void`

Defined in: [transport/gemini-live-transport.ts:156](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L156)

Fires when the model begins any response (audio, tool call, etc.).
 Used by VoiceSession to trigger STT provider commit.

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onModelTurnStart`](../interfaces/LLMTransport.md#onmodelturnstart)

***

### onOutputTranscription()?

> `optional` **onOutputTranscription**: (`text`) => `void`

Defined in: [transport/gemini-live-transport.ts:152](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L152)

#### Parameters

##### text

`string`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onOutputTranscription`](../interfaces/LLMTransport.md#onoutputtranscription)

***

### onRealtimeLLMUsage()?

> `optional` **onRealtimeLLMUsage**: (`usage`) => `void`

Defined in: [transport/gemini-live-transport.ts:163](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L163)

Optional: fires when the provider reports token or duration usage for billing/observability.

#### Parameters

##### usage

[`RealtimeLLMUsageEvent`](../interfaces/RealtimeLLMUsageEvent.md)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onRealtimeLLMUsage`](../interfaces/LLMTransport.md#onrealtimellmusage)

***

### onResumptionUpdate()?

> `optional` **onResumptionUpdate**: (`handle`, `resumable`) => `void`

Defined in: [transport/gemini-live-transport.ts:158](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L158)

#### Parameters

##### handle

`string`

##### resumable

`boolean`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onResumptionUpdate`](../interfaces/LLMTransport.md#onresumptionupdate)

***

### onSessionReady()?

> `optional` **onSessionReady**: (`sessionId`) => `void`

Defined in: [transport/gemini-live-transport.ts:153](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L153)

#### Parameters

##### sessionId

`string`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onSessionReady`](../interfaces/LLMTransport.md#onsessionready)

***

### onSpeechStarted()?

> `optional` **onSpeechStarted**: () => `void`

Defined in: [transport/gemini-live-transport.ts:162](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L162)

Fires when the transport detects user speech via VAD.
 Used for TTS-level barge-in when the LLM is idle but TTS is still playing.
 OpenAI: wired to input_audio_buffer.speech_started.
 Gemini: may require custom VAD signal — needs empirical testing.

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onSpeechStarted`](../interfaces/LLMTransport.md#onspeechstarted)

***

### onTextDone()?

> `optional` **onTextDone**: () => `void`

Defined in: [transport/gemini-live-transport.ts:161](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L161)

Fires when the model's text response is complete for this turn.
 Signals that all text for the current response has been delivered.
 Ordering contract: fires after all onTextOutput, before onTurnComplete.

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onTextDone`](../interfaces/LLMTransport.md#ontextdone)

***

### onTextOutput()?

> `optional` **onTextOutput**: (`text`) => `void`

Defined in: [transport/gemini-live-transport.ts:160](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L160)

Fires when the model produces text output (text-mode responses).
 Only active when responseModality is 'text' (i.e., external TTS in use).

#### Parameters

##### text

`string`

Incremental text chunk (may be partial word/sentence)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onTextOutput`](../interfaces/LLMTransport.md#ontextoutput)

***

### onToolCall()?

> `optional` **onToolCall**: (`calls`) => `void`

Defined in: [transport/gemini-live-transport.ts:147](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L147)

#### Parameters

##### calls

[`TransportToolCall`](../interfaces/TransportToolCall.md)[]

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onToolCall`](../interfaces/LLMTransport.md#ontoolcall)

***

### onToolCallCancel()?

> `optional` **onToolCallCancel**: (`ids`) => `void`

Defined in: [transport/gemini-live-transport.ts:148](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L148)

#### Parameters

##### ids

`string`[]

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onToolCallCancel`](../interfaces/LLMTransport.md#ontoolcallcancel)

***

### onTurnComplete()?

> `optional` **onTurnComplete**: () => `void`

Defined in: [transport/gemini-live-transport.ts:149](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L149)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onTurnComplete`](../interfaces/LLMTransport.md#onturncomplete)

## Accessors

### isConnected

#### Get Signature

> **get** **isConnected**(): `boolean`

Defined in: [transport/gemini-live-transport.ts:362](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L362)

##### Returns

`boolean`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`isConnected`](../interfaces/LLMTransport.md#isconnected)

## Methods

### clearAudio()

> **clearAudio**(): `void`

Defined in: [transport/gemini-live-transport.ts:410](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L410)

No-op for V1 — server VAD only.

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`clearAudio`](../interfaces/LLMTransport.md#clearaudio)

***

### commitAudio()

> **commitAudio**(): `void`

Defined in: [transport/gemini-live-transport.ts:407](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L407)

No-op for V1 — server VAD only.

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`commitAudio`](../interfaces/LLMTransport.md#commitaudio)

***

### connect()

> **connect**(`transportConfig?`): `Promise`\<`void`\>

Defined in: [transport/gemini-live-transport.ts:178](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L178)

Establish a WebSocket connection to the Gemini Live API.
 Resolves only after Gemini sends `setupComplete`, so callers can safely
 send content immediately after awaiting this method.

 Also satisfies `LLMTransport.connect(config)` — if config is provided,
 it is applied before connecting.

#### Parameters

##### transportConfig?

[`LLMTransportConfig`](../interfaces/LLMTransportConfig.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`connect`](../interfaces/LLMTransport.md#connect)

***

### disconnect()

> **disconnect**(): `Promise`\<`void`\>

Defined in: [transport/gemini-live-transport.ts:308](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L308)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`disconnect`](../interfaces/LLMTransport.md#disconnect)

***

### reconnect()

> **reconnect**(`stateOrHandle?`): `Promise`\<`void`\>

Defined in: [transport/gemini-live-transport.ts:280](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L280)

Disconnect and reconnect, optionally with a new resumption handle or ReconnectState.
 Accepts either a string handle (legacy API) or ReconnectState (LLMTransport API).

#### Parameters

##### stateOrHandle?

`string` | [`ReconnectState`](../interfaces/ReconnectState.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`reconnect`](../interfaces/LLMTransport.md#reconnect)

***

### sendAudio()

> **sendAudio**(`base64Data`): `void`

Defined in: [transport/gemini-live-transport.ts:322](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L322)

Send base64-encoded PCM audio to Gemini as realtime input.

#### Parameters

##### base64Data

`string`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`sendAudio`](../interfaces/LLMTransport.md#sendaudio)

***

### sendClientContent()

> **sendClientContent**(`turns`, `turnComplete?`): `void`

Defined in: [transport/gemini-live-transport.ts:339](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L339)

Send text-based conversation turns to Gemini (legacy API, used for context replay).

#### Parameters

##### turns

`object`[]

##### turnComplete?

`boolean` = `true`

#### Returns

`void`

***

### sendContent()

> **sendContent**(`turns`, `turnComplete?`): `void`

Defined in: [transport/gemini-live-transport.ts:369](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L369)

Send provider-neutral content turns to Gemini. Converts ContentTurn to Gemini format.

#### Parameters

##### turns

[`ContentTurn`](../interfaces/ContentTurn.md)[]

##### turnComplete?

`boolean` = `true`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`sendContent`](../interfaces/LLMTransport.md#sendcontent)

***

### sendFile()

> **sendFile**(`base64Data`, `mimeType`): `void`

Defined in: [transport/gemini-live-transport.ts:379](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L379)

Send a file/image to Gemini as inline data.

#### Parameters

##### base64Data

`string`

##### mimeType

`string`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`sendFile`](../interfaces/LLMTransport.md#sendfile)

***

### sendToolResponse()

> **sendToolResponse**(`responses`, `_scheduling?`): `void`

Defined in: [transport/gemini-live-transport.ts:330](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L330)

Send tool execution results back to Gemini (legacy API).

#### Parameters

##### responses

`object`[]

##### \_scheduling?

`"SILENT"` | `"WHEN_IDLE"` | `"INTERRUPT"`

#### Returns

`void`

***

### sendToolResult()

> **sendToolResult**(`result`): `void`

Defined in: [transport/gemini-live-transport.ts:388](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L388)

Send a tool result back to Gemini (LLMTransport API).

#### Parameters

##### result

[`TransportToolResult`](../interfaces/TransportToolResult.md)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`sendToolResult`](../interfaces/LLMTransport.md#sendtoolresult)

***

### transferSession()

> **transferSession**(`config`, `state?`): `Promise`\<`void`\>

Defined in: [transport/gemini-live-transport.ts:437](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L437)

Transfer session: update config → reconnect → replay conversation history.

#### Parameters

##### config

[`SessionUpdate`](../interfaces/SessionUpdate.md)

##### state?

[`ReconnectState`](../interfaces/ReconnectState.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`transferSession`](../interfaces/LLMTransport.md#transfersession)

***

### triggerGeneration()

> **triggerGeneration**(`_instructions?`): `void`

Defined in: [transport/gemini-live-transport.ts:402](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L402)

No-op for Gemini — generation is automatic after tool results and content injection.

#### Parameters

##### \_instructions?

`string`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`triggerGeneration`](../interfaces/LLMTransport.md#triggergeneration)

***

### updateGoogleSearch()

> **updateGoogleSearch**(`enabled`): `void`

Defined in: [transport/gemini-live-transport.ts:358](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L358)

Update Google Search grounding flag (applied on next reconnect).

#### Parameters

##### enabled

`boolean`

#### Returns

`void`

***

### updateSession()

> **updateSession**(`config`): `void`

Defined in: [transport/gemini-live-transport.ts:413](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L413)

Update session configuration (applied on next reconnect for Gemini).

#### Parameters

##### config

[`SessionUpdate`](../interfaces/SessionUpdate.md)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`updateSession`](../interfaces/LLMTransport.md#updatesession)

***

### updateSystemInstruction()

> **updateSystemInstruction**(`instruction`): `void`

Defined in: [transport/gemini-live-transport.ts:353](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L353)

Update the system instruction (applied on next reconnect).

#### Parameters

##### instruction

`string`

#### Returns

`void`

***

### updateTools()

> **updateTools**(`tools`): `void`

Defined in: [transport/gemini-live-transport.ts:348](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L348)

Update the tool declarations (applied on next reconnect).

#### Parameters

##### tools

[`ToolDefinition`](../interfaces/ToolDefinition.md)[]

#### Returns

`void`
