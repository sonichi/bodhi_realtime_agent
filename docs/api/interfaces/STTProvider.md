[bodhi-realtime-agent](../index.md) / STTProvider

# Interface: STTProvider

Defined in: [types/transport.ts:45](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L45)

Provider-agnostic interface for pluggable speech-to-text providers.

VoiceSession creates the provider, calls configure() with the transport's
audio format, then start(). Audio flows via feedAudio(); turn signals via
commit()/handleInterrupted()/handleTurnComplete(). Results arrive via the
onTranscript/onPartialTranscript callbacks.

## Properties

### onPartialTranscript()?

> `optional` **onPartialTranscript**: (`text`) => `void`

Defined in: [types/transport.ts:83](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L83)

Partial/interim transcription (streaming providers only).
 Replaces any previous partial for the same turn.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### onTranscript()?

> `optional` **onTranscript**: (`text`, `turnId`) => `void`

Defined in: [types/transport.ts:79](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L79)

Final transcription of user speech.

#### Parameters

##### text

`string`

The transcribed text.

##### turnId

The turn this transcript belongs to (from commit()).
              Undefined when a streaming provider's VAD auto-commits
              before the framework calls commit().

`number` | `undefined`

#### Returns

`void`

## Methods

### commit()

> **commit**(`turnId`): `void`

Defined in: [types/transport.ts:64](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L64)

Signal that the user's turn has ended (model started responding).
 For batch providers, this triggers transcription.
 For streaming providers, this may trigger a manual commit.

#### Parameters

##### turnId

`number`

Monotonically increasing turn counter for ordering.

#### Returns

`void`

***

### configure()

> **configure**(`audio`): `void`

Defined in: [types/transport.ts:49](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L49)

Configure the audio format that feedAudio() will deliver.
 Called once before start(). The provider MUST resample or reject
 if it cannot handle the given format.

#### Parameters

##### audio

[`STTAudioConfig`](STTAudioConfig.md)

#### Returns

`void`

***

### feedAudio()

> **feedAudio**(`base64Pcm`): `void`

Defined in: [types/transport.ts:58](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L58)

Feed audio data. Format matches the STTAudioConfig from configure().

#### Parameters

##### base64Pcm

`string`

Base64-encoded PCM audio chunk.

#### Returns

`void`

***

### handleInterrupted()

> **handleInterrupted**(): `void`

Defined in: [types/transport.ts:68](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L68)

Signal that the current turn was interrupted by the user.
 Providers MUST preserve buffered audio for the next commit().

#### Returns

`void`

***

### handleTurnComplete()

> **handleTurnComplete**(): `void`

Defined in: [types/transport.ts:72](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L72)

Signal a natural turn completion (model finished, no interruption).
 Batch providers SHOULD clear buffers. Streaming providers may no-op.

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [types/transport.ts:52](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L52)

Start the STT session (e.g. open WebSocket).

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [types/transport.ts:54](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L54)

Stop the STT session (e.g. close WebSocket).

#### Returns

`Promise`\<`void`\>
