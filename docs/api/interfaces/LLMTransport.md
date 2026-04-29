[bodhi-realtime-agent](../index.md) / LLMTransport

# Interface: LLMTransport

Defined in: [types/transport.ts:255](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L255)

Provider-agnostic interface for realtime LLM transports.

Each provider (Gemini Live, OpenAI Realtime) implements this interface,
exposing static capabilities and handling provider-specific wire protocols internally.

## Properties

### audioFormat

> `readonly` **audioFormat**: [`AudioFormatSpec`](AudioFormatSpec.md)

Defined in: [types/transport.ts:267](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L267)

***

### capabilities

> `readonly` **capabilities**: [`TransportCapabilities`](TransportCapabilities.md)

Defined in: [types/transport.ts:257](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L257)

Static capabilities — read before connecting, used for orchestrator branching.

***

### isConnected

> `readonly` **isConnected**: `boolean`

Defined in: [types/transport.ts:263](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L263)

***

### onAudioOutput()?

> `optional` **onAudioOutput**: (`base64Data`) => `void`

Defined in: [types/transport.ts:292](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L292)

#### Parameters

##### base64Data

`string`

#### Returns

`void`

***

### onClose()?

> `optional` **onClose**: (`code?`, `reason?`) => `void`

Defined in: [types/transport.ts:301](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L301)

#### Parameters

##### code?

`number`

##### reason?

`string`

#### Returns

`void`

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [types/transport.ts:300](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L300)

#### Parameters

##### error

[`LLMTransportError`](LLMTransportError.md)

#### Returns

`void`

***

### onGoAway()?

> `optional` **onGoAway**: (`timeLeft`) => `void`

Defined in: [types/transport.ts:326](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L326)

#### Parameters

##### timeLeft

`string`

#### Returns

`void`

***

### onGroundingMetadata()?

> `optional` **onGroundingMetadata**: (`metadata`) => `void`

Defined in: [types/transport.ts:328](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L328)

#### Parameters

##### metadata

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### onInputTranscription()?

> `optional` **onInputTranscription**: (`text`) => `void`

Defined in: [types/transport.ts:297](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L297)

#### Parameters

##### text

`string`

#### Returns

`void`

***

### onInterrupted()?

> `optional` **onInterrupted**: () => `void`

Defined in: [types/transport.ts:296](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L296)

#### Returns

`void`

***

### onModelTurnStart()?

> `optional` **onModelTurnStart**: () => `void`

Defined in: [types/transport.ts:306](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L306)

Fires when the model begins any response (audio, tool call, etc.).
 Used by VoiceSession to trigger STT provider commit.

#### Returns

`void`

***

### onOutputTranscription()?

> `optional` **onOutputTranscription**: (`text`) => `void`

Defined in: [types/transport.ts:298](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L298)

#### Parameters

##### text

`string`

#### Returns

`void`

***

### onRealtimeLLMUsage()?

> `optional` **onRealtimeLLMUsage**: (`usage`) => `void`

Defined in: [types/transport.ts:331](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L331)

Optional: fires when the provider reports token or duration usage for billing/observability.

#### Parameters

##### usage

[`RealtimeLLMUsageEvent`](RealtimeLLMUsageEvent.md)

#### Returns

`void`

***

### onResumptionUpdate()?

> `optional` **onResumptionUpdate**: (`handle`, `resumable`) => `void`

Defined in: [types/transport.ts:327](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L327)

#### Parameters

##### handle

`string`

##### resumable

`boolean`

#### Returns

`void`

***

### onSessionReady()?

> `optional` **onSessionReady**: (`sessionId`) => `void`

Defined in: [types/transport.ts:299](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L299)

#### Parameters

##### sessionId

`string`

#### Returns

`void`

***

### onSpeechStarted()?

> `optional` **onSpeechStarted**: () => `void`

Defined in: [types/transport.ts:323](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L323)

Fires when the transport detects user speech via VAD.
 Used for TTS-level barge-in when the LLM is idle but TTS is still playing.
 OpenAI: wired to input_audio_buffer.speech_started.
 Gemini: may require custom VAD signal — needs empirical testing.

#### Returns

`void`

***

### onTextDone()?

> `optional` **onTextDone**: () => `void`

Defined in: [types/transport.ts:317](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L317)

Fires when the model's text response is complete for this turn.
 Signals that all text for the current response has been delivered.
 Ordering contract: fires after all onTextOutput, before onTurnComplete.

#### Returns

`void`

***

### onTextOutput()?

> `optional` **onTextOutput**: (`text`) => `void`

Defined in: [types/transport.ts:312](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L312)

Fires when the model produces text output (text-mode responses).
 Only active when responseModality is 'text' (i.e., external TTS in use).

#### Parameters

##### text

`string`

Incremental text chunk (may be partial word/sentence)

#### Returns

`void`

***

### onToolCall()?

> `optional` **onToolCall**: (`calls`) => `void`

Defined in: [types/transport.ts:293](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L293)

#### Parameters

##### calls

[`TransportToolCall`](TransportToolCall.md)[]

#### Returns

`void`

***

### onToolCallCancel()?

> `optional` **onToolCallCancel**: (`ids`) => `void`

Defined in: [types/transport.ts:294](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L294)

#### Parameters

##### ids

`string`[]

#### Returns

`void`

***

### onTurnComplete()?

> `optional` **onTurnComplete**: () => `void`

Defined in: [types/transport.ts:295](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L295)

#### Returns

`void`

## Methods

### clearAudio()

> **clearAudio**(): `void`

Defined in: [types/transport.ts:271](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L271)

#### Returns

`void`

***

### commitAudio()

> **commitAudio**(): `void`

Defined in: [types/transport.ts:270](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L270)

#### Returns

`void`

***

### connect()

> **connect**(`config?`): `Promise`\<`void`\>

Defined in: [types/transport.ts:260](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L260)

#### Parameters

##### config?

[`LLMTransportConfig`](LLMTransportConfig.md)

#### Returns

`Promise`\<`void`\>

***

### disconnect()

> **disconnect**(): `Promise`\<`void`\>

Defined in: [types/transport.ts:261](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L261)

#### Returns

`Promise`\<`void`\>

***

### reconnect()

> **reconnect**(`state?`): `Promise`\<`void`\>

Defined in: [types/transport.ts:262](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L262)

#### Parameters

##### state?

[`ReconnectState`](ReconnectState.md)

#### Returns

`Promise`\<`void`\>

***

### sendAudio()

> **sendAudio**(`base64Data`): `void`

Defined in: [types/transport.ts:266](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L266)

#### Parameters

##### base64Data

`string`

#### Returns

`void`

***

### sendContent()

> **sendContent**(`turns`, `turnComplete?`): `void`

Defined in: [types/transport.ts:280](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L280)

#### Parameters

##### turns

[`ContentTurn`](ContentTurn.md)[]

##### turnComplete?

`boolean`

#### Returns

`void`

***

### sendFile()

> **sendFile**(`base64Data`, `mimeType`): `void`

Defined in: [types/transport.ts:283](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L283)

#### Parameters

##### base64Data

`string`

##### mimeType

`string`

#### Returns

`void`

***

### sendToolResult()

> **sendToolResult**(`result`): `void`

Defined in: [types/transport.ts:286](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L286)

#### Parameters

##### result

[`TransportToolResult`](TransportToolResult.md)

#### Returns

`void`

***

### transferSession()

> **transferSession**(`config`, `state?`): `Promise`\<`void`\>

Defined in: [types/transport.ts:277](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L277)

#### Parameters

##### config

[`SessionUpdate`](SessionUpdate.md)

##### state?

[`ReconnectState`](ReconnectState.md)

#### Returns

`Promise`\<`void`\>

***

### triggerGeneration()

> **triggerGeneration**(`instructions?`): `void`

Defined in: [types/transport.ts:289](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L289)

#### Parameters

##### instructions?

`string`

#### Returns

`void`

***

### updateSession()

> **updateSession**(`config`): `void`

Defined in: [types/transport.ts:274](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L274)

#### Parameters

##### config

[`SessionUpdate`](SessionUpdate.md)

#### Returns

`void`
