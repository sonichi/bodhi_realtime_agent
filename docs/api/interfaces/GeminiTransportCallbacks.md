[bodhi-realtime-agent](../index.md) / GeminiTransportCallbacks

# Interface: GeminiTransportCallbacks

Defined in: [transport/gemini-live-transport.ts:60](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L60)

Callbacks fired by GeminiLiveTransport when server messages arrive.

## Methods

### onAudioOutput()?

> `optional` **onAudioOutput**(`data`): `void`

Defined in: [transport/gemini-live-transport.ts:64](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L64)

Base64-encoded PCM audio output from the model.

#### Parameters

##### data

`string`

#### Returns

`void`

***

### onClose()?

> `optional` **onClose**(`code?`, `reason?`): `void`

Defined in: [transport/gemini-live-transport.ts:88](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L88)

WebSocket connection closed.

#### Parameters

##### code?

`number`

##### reason?

`string`

#### Returns

`void`

***

### onError()?

> `optional` **onError**(`error`): `void`

Defined in: [transport/gemini-live-transport.ts:86](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L86)

Transport-level error.

#### Parameters

##### error

`Error`

#### Returns

`void`

***

### onGoAway()?

> `optional` **onGoAway**(`timeLeft`): `void`

Defined in: [transport/gemini-live-transport.ts:80](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L80)

Server is shutting down — reconnect before timeLeft expires.

#### Parameters

##### timeLeft

`string`

#### Returns

`void`

***

### onGroundingMetadata()?

> `optional` **onGroundingMetadata**(`metadata`): `void`

Defined in: [transport/gemini-live-transport.ts:84](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L84)

Grounding metadata from Google Search results.

#### Parameters

##### metadata

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### onInputTranscription()?

> `optional` **onInputTranscription**(`text`): `void`

Defined in: [transport/gemini-live-transport.ts:76](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L76)

Transcription of user's spoken input.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### onInterrupted()?

> `optional` **onInterrupted**(): `void`

Defined in: [transport/gemini-live-transport.ts:72](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L72)

Model's response was interrupted by user speech.

#### Returns

`void`

***

### onModelTurnStart()?

> `optional` **onModelTurnStart**(): `void`

Defined in: [transport/gemini-live-transport.ts:74](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L74)

Model started a new response turn (first audio or tool call).

#### Returns

`void`

***

### onOutputTranscription()?

> `optional` **onOutputTranscription**(`text`): `void`

Defined in: [transport/gemini-live-transport.ts:78](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L78)

Transcription of model's spoken output.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### onResumptionUpdate()?

> `optional` **onResumptionUpdate**(`handle`, `resumable`): `void`

Defined in: [transport/gemini-live-transport.ts:82](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L82)

New session resumption handle available.

#### Parameters

##### handle

`string`

##### resumable

`boolean`

#### Returns

`void`

***

### onSetupComplete()?

> `optional` **onSetupComplete**(`sessionId`): `void`

Defined in: [transport/gemini-live-transport.ts:62](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L62)

Gemini session setup is complete and ready for audio.

#### Parameters

##### sessionId

`string`

#### Returns

`void`

***

### onToolCall()?

> `optional` **onToolCall**(`calls`): `void`

Defined in: [transport/gemini-live-transport.ts:66](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L66)

Model is requesting one or more tool invocations.

#### Parameters

##### calls

`object`[]

#### Returns

`void`

***

### onToolCallCancellation()?

> `optional` **onToolCallCancellation**(`ids`): `void`

Defined in: [transport/gemini-live-transport.ts:68](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L68)

Model is cancelling previously requested tool calls.

#### Parameters

##### ids

`string`[]

#### Returns

`void`

***

### onTurnComplete()?

> `optional` **onTurnComplete**(): `void`

Defined in: [transport/gemini-live-transport.ts:70](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L70)

Model has finished its response turn.

#### Returns

`void`
