[bodhi-realtime-agent](../index.md) / ElevenLabsSTTProvider

# Class: ElevenLabsSTTProvider

Defined in: [transport/elevenlabs-stt-provider.ts:45](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L45)

Streaming STT provider backed by ElevenLabs Scribe v2 Realtime API.

Unlike the batch [GeminiBatchSTTProvider](GeminiBatchSTTProvider.md), this provider forwards
every audio chunk to ElevenLabs in real time over a persistent WebSocket
and fires `onPartialTranscript` during speech.

## Implements

- [`STTProvider`](../interfaces/STTProvider.md)

## Constructors

### Constructor

> **new ElevenLabsSTTProvider**(`config`): `ElevenLabsSTTProvider`

Defined in: [transport/elevenlabs-stt-provider.ts:75](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L75)

#### Parameters

##### config

[`ElevenLabsSTTConfig`](../interfaces/ElevenLabsSTTConfig.md)

#### Returns

`ElevenLabsSTTProvider`

## Properties

### onPartialTranscript()?

> `optional` **onPartialTranscript**: (`text`) => `void`

Defined in: [transport/elevenlabs-stt-provider.ts:73](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L73)

Partial/interim transcription (streaming providers only).
 Replaces any previous partial for the same turn.

#### Parameters

##### text

`string`

#### Returns

`void`

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`onPartialTranscript`](../interfaces/STTProvider.md#onpartialtranscript)

***

### onTranscript()?

> `optional` **onTranscript**: (`text`, `turnId`) => `void`

Defined in: [transport/elevenlabs-stt-provider.ts:72](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L72)

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

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`onTranscript`](../interfaces/STTProvider.md#ontranscript)

## Methods

### commit()

> **commit**(`turnId`): `void`

Defined in: [transport/elevenlabs-stt-provider.ts:145](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L145)

Signal that the user's turn has ended (model started responding).
 For batch providers, this triggers transcription.
 For streaming providers, this may trigger a manual commit.

#### Parameters

##### turnId

`number`

Monotonically increasing turn counter for ordering.

#### Returns

`void`

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`commit`](../interfaces/STTProvider.md#commit)

***

### configure()

> **configure**(`audio`): `void`

Defined in: [transport/elevenlabs-stt-provider.ts:86](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L86)

Configure the audio format that feedAudio() will deliver.
 Called once before start(). The provider MUST resample or reject
 if it cannot handle the given format.

#### Parameters

##### audio

[`STTAudioConfig`](../interfaces/STTAudioConfig.md)

#### Returns

`void`

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`configure`](../interfaces/STTProvider.md#configure)

***

### feedAudio()

> **feedAudio**(`base64Pcm`): `void`

Defined in: [transport/elevenlabs-stt-provider.ts:131](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L131)

Feed audio data. Format matches the STTAudioConfig from configure().

#### Parameters

##### base64Pcm

`string`

Base64-encoded PCM audio chunk.

#### Returns

`void`

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`feedAudio`](../interfaces/STTProvider.md#feedaudio)

***

### handleInterrupted()

> **handleInterrupted**(): `void`

Defined in: [transport/elevenlabs-stt-provider.ts:157](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L157)

Signal that the current turn was interrupted by the user.
 Providers MUST preserve buffered audio for the next commit().

#### Returns

`void`

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`handleInterrupted`](../interfaces/STTProvider.md#handleinterrupted)

***

### handleTurnComplete()

> **handleTurnComplete**(): `void`

Defined in: [transport/elevenlabs-stt-provider.ts:161](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L161)

Signal a natural turn completion (model finished, no interruption).
 Batch providers SHOULD clear buffers. Streaming providers may no-op.

#### Returns

`void`

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`handleTurnComplete`](../interfaces/STTProvider.md#handleturncomplete)

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [transport/elevenlabs-stt-provider.ts:104](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L104)

Start the STT session (e.g. open WebSocket).

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`start`](../interfaces/STTProvider.md#start)

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [transport/elevenlabs-stt-provider.ts:110](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L110)

Stop the STT session (e.g. close WebSocket).

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`stop`](../interfaces/STTProvider.md#stop)
