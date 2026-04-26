[bodhi-realtime-agent](../index.md) / OpenAIRealtimeTransport

# Class: OpenAIRealtimeTransport

Defined in: [transport/openai-realtime-transport.ts:72](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L72)

LLMTransport implementation for the OpenAI Realtime API.

Uses the `openai` SDK's WebSocket transport (`OpenAIRealtimeWS`) for
bidirectional audio streaming with function calling support.

Key differences from Gemini:
- In-place session updates (no reconnect for agent transfers)
- Streamed function call arguments (accumulated before dispatch)
- Client-managed interruption (truncate + cancel)
- 24kHz audio (vs Gemini's 16kHz)
- Explicit `response.create` required after tool results

## Implements

- [`LLMTransport`](../interfaces/LLMTransport.md)

## Constructors

### Constructor

> **new OpenAIRealtimeTransport**(`config`): `OpenAIRealtimeTransport`

Defined in: [transport/openai-realtime-transport.ts:141](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L141)

#### Parameters

##### config

[`OpenAIRealtimeConfig`](../interfaces/OpenAIRealtimeConfig.md)

#### Returns

`OpenAIRealtimeTransport`

## Properties

### audioFormat

> `readonly` **audioFormat**: [`AudioFormatSpec`](../interfaces/AudioFormatSpec.md)

Defined in: [transport/openai-realtime-transport.ts:84](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L84)

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`audioFormat`](../interfaces/LLMTransport.md#audioformat)

***

### capabilities

> `readonly` **capabilities**: [`TransportCapabilities`](../interfaces/TransportCapabilities.md)

Defined in: [transport/openai-realtime-transport.ts:73](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L73)

Static capabilities — read before connecting, used for orchestrator branching.

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`capabilities`](../interfaces/LLMTransport.md#capabilities)

***

### onAudioOutput()?

> `optional` **onAudioOutput**: (`base64Data`) => `void`

Defined in: [transport/openai-realtime-transport.ts:93](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L93)

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

Defined in: [transport/openai-realtime-transport.ts:102](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L102)

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

Defined in: [transport/openai-realtime-transport.ts:101](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L101)

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

Defined in: [transport/openai-realtime-transport.ts:104](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L104)

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

Defined in: [transport/openai-realtime-transport.ts:106](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L106)

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

Defined in: [transport/openai-realtime-transport.ts:98](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L98)

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

Defined in: [transport/openai-realtime-transport.ts:97](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L97)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onInterrupted`](../interfaces/LLMTransport.md#oninterrupted)

***

### onModelTurnStart()?

> `optional` **onModelTurnStart**: () => `void`

Defined in: [transport/openai-realtime-transport.ts:103](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L103)

Fires when the model begins any response (audio, tool call, etc.).
 Used by VoiceSession to trigger STT provider commit.

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onModelTurnStart`](../interfaces/LLMTransport.md#onmodelturnstart)

***

### onOutputTranscription()?

> `optional` **onOutputTranscription**: (`text`) => `void`

Defined in: [transport/openai-realtime-transport.ts:99](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L99)

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

Defined in: [transport/openai-realtime-transport.ts:110](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L110)

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

Defined in: [transport/openai-realtime-transport.ts:105](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L105)

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

Defined in: [transport/openai-realtime-transport.ts:100](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L100)

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

Defined in: [transport/openai-realtime-transport.ts:109](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L109)

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

Defined in: [transport/openai-realtime-transport.ts:108](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L108)

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

Defined in: [transport/openai-realtime-transport.ts:107](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L107)

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

Defined in: [transport/openai-realtime-transport.ts:94](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L94)

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

Defined in: [transport/openai-realtime-transport.ts:95](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L95)

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

Defined in: [transport/openai-realtime-transport.ts:96](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L96)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`onTurnComplete`](../interfaces/LLMTransport.md#onturncomplete)

## Accessors

### isConnected

#### Get Signature

> **get** **isConnected**(): `boolean`

Defined in: [transport/openai-realtime-transport.ts:147](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L147)

##### Returns

`boolean`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`isConnected`](../interfaces/LLMTransport.md#isconnected)

## Methods

### clearAudio()

> **clearAudio**(): `void`

Defined in: [transport/openai-realtime-transport.ts:265](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L265)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`clearAudio`](../interfaces/LLMTransport.md#clearaudio)

***

### commitAudio()

> **commitAudio**(): `void`

Defined in: [transport/openai-realtime-transport.ts:260](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L260)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`commitAudio`](../interfaces/LLMTransport.md#commitaudio)

***

### connect()

> **connect**(`transportConfig?`): `Promise`\<`void`\>

Defined in: [transport/openai-realtime-transport.ts:153](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L153)

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

Defined in: [transport/openai-realtime-transport.ts:202](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L202)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`disconnect`](../interfaces/LLMTransport.md#disconnect)

***

### reconnect()

> **reconnect**(`state?`): `Promise`\<`void`\>

Defined in: [transport/openai-realtime-transport.ts:221](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L221)

#### Parameters

##### state?

[`ReconnectState`](../interfaces/ReconnectState.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`reconnect`](../interfaces/LLMTransport.md#reconnect)

***

### sendAudio()

> **sendAudio**(`base64Data`): `void`

Defined in: [transport/openai-realtime-transport.ts:255](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L255)

#### Parameters

##### base64Data

`string`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`sendAudio`](../interfaces/LLMTransport.md#sendaudio)

***

### sendContent()

> **sendContent**(`turns`, `turnComplete?`): `void`

Defined in: [transport/openai-realtime-transport.ts:351](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L351)

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

Defined in: [transport/openai-realtime-transport.ts:383](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L383)

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

### sendToolResult()

> **sendToolResult**(`result`): `void`

Defined in: [transport/openai-realtime-transport.ts:405](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L405)

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

Defined in: [transport/openai-realtime-transport.ts:302](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L302)

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

> **triggerGeneration**(`instructions?`): `void`

Defined in: [transport/openai-realtime-transport.ts:442](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L442)

#### Parameters

##### instructions?

`string`

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`triggerGeneration`](../interfaces/LLMTransport.md#triggergeneration)

***

### updateSession()

> **updateSession**(`config`): `void`

Defined in: [transport/openai-realtime-transport.ts:272](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L272)

#### Parameters

##### config

[`SessionUpdate`](../interfaces/SessionUpdate.md)

#### Returns

`void`

#### Implementation of

[`LLMTransport`](../interfaces/LLMTransport.md).[`updateSession`](../interfaces/LLMTransport.md#updatesession)
