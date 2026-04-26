[bodhi-realtime-agent](../index.md) / GeminiBatchSTTProvider

# Class: GeminiBatchSTTProvider

Defined in: [transport/gemini-batch-stt-provider.ts:30](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-batch-stt-provider.ts#L30)

STTProvider that uses a separate Gemini model via generateContent() for
batch transcription of buffered user audio.

Extracted from GeminiLiveTransport. Audio is buffered via feedAudio(),
then transcribed when commit() is called (triggered by model turn start).

## Implements

- [`STTProvider`](../interfaces/STTProvider.md)

## Constructors

### Constructor

> **new GeminiBatchSTTProvider**(`config`): `GeminiBatchSTTProvider`

Defined in: [transport/gemini-batch-stt-provider.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-batch-stt-provider.ts#L41)

#### Parameters

##### config

[`GeminiBatchSTTConfig`](../interfaces/GeminiBatchSTTConfig.md)

#### Returns

`GeminiBatchSTTProvider`

## Properties

### onPartialTranscript()?

> `optional` **onPartialTranscript**: (`text`) => `void`

Defined in: [transport/gemini-batch-stt-provider.ts:39](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-batch-stt-provider.ts#L39)

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

Defined in: [transport/gemini-batch-stt-provider.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-batch-stt-provider.ts#L38)

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

Defined in: [transport/gemini-batch-stt-provider.ts:77](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-batch-stt-provider.ts#L77)

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

Defined in: [transport/gemini-batch-stt-provider.ts:46](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-batch-stt-provider.ts#L46)

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

Defined in: [transport/gemini-batch-stt-provider.ts:65](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-batch-stt-provider.ts#L65)

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

Defined in: [transport/gemini-batch-stt-provider.ts:123](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-batch-stt-provider.ts#L123)

Signal that the current turn was interrupted by the user.
 Providers MUST preserve buffered audio for the next commit().

#### Returns

`void`

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`handleInterrupted`](../interfaces/STTProvider.md#handleinterrupted)

***

### handleTurnComplete()

> **handleTurnComplete**(): `void`

Defined in: [transport/gemini-batch-stt-provider.ts:127](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-batch-stt-provider.ts#L127)

Signal a natural turn completion (model finished, no interruption).
 Batch providers SHOULD clear buffers. Streaming providers may no-op.

#### Returns

`void`

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`handleTurnComplete`](../interfaces/STTProvider.md#handleturncomplete)

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [transport/gemini-batch-stt-provider.ts:56](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-batch-stt-provider.ts#L56)

Start the STT session (e.g. open WebSocket).

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`start`](../interfaces/STTProvider.md#start)

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [transport/gemini-batch-stt-provider.ts:60](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-batch-stt-provider.ts#L60)

Stop the STT session (e.g. close WebSocket).

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`STTProvider`](../interfaces/STTProvider.md).[`stop`](../interfaces/STTProvider.md#stop)
