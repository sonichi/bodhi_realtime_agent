[bodhi-realtime-agent](../index.md) / ElevenLabsTTSProvider

# Class: ElevenLabsTTSProvider

Defined in: [transport/elevenlabs-tts-provider.ts:51](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L51)

Streaming TTS provider backed by ElevenLabs WebSocket streaming API.

Uses the `/v1/text-to-speech/{voice_id}/stream-input` endpoint to stream
text in and receive base64-encoded PCM audio out. Text is buffered via
SentenceBuffer and sent at sentence boundaries for natural prosody.

## Implements

- [`TTSProvider`](../interfaces/TTSProvider.md)

## Constructors

### Constructor

> **new ElevenLabsTTSProvider**(`config`): `ElevenLabsTTSProvider`

Defined in: [transport/elevenlabs-tts-provider.ts:91](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L91)

#### Parameters

##### config

[`ElevenLabsTTSConfig`](../interfaces/ElevenLabsTTSConfig.md)

#### Returns

`ElevenLabsTTSProvider`

## Properties

### onAudio()?

> `optional` **onAudio**: (`base64Pcm`, `durationMs`, `requestId`) => `void`

Defined in: [transport/elevenlabs-tts-provider.ts:86](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L86)

Audio chunk ready for delivery to client.

#### Parameters

##### base64Pcm

`string`

Base64-encoded PCM audio chunk

##### durationMs

`number`

Duration of this chunk in milliseconds

##### requestId

`number`

The requestId from the synthesize() call that produced this audio

#### Returns

`void`

#### Implementation of

[`TTSProvider`](../interfaces/TTSProvider.md).[`onAudio`](../interfaces/TTSProvider.md#onaudio)

***

### onDone()?

> `optional` **onDone**: (`requestId`) => `void`

Defined in: [transport/elevenlabs-tts-provider.ts:87](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L87)

Synthesis completed for a request.
 Fired after the final audio chunk for the given requestId.
 VoiceSession uses this to gate turn completion.

#### Parameters

##### requestId

`number`

The requestId that has completed synthesis

#### Returns

`void`

#### Implementation of

[`TTSProvider`](../interfaces/TTSProvider.md).[`onDone`](../interfaces/TTSProvider.md#ondone)

***

### onError()?

> `optional` **onError**: (`error`, `fatal`) => `void`

Defined in: [transport/elevenlabs-tts-provider.ts:89](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L89)

Error during synthesis. Non-fatal errors are logged;
 fatal errors trigger session close (fail-fast in V1).

#### Parameters

##### error

`Error`

##### fatal

`boolean`

#### Returns

`void`

#### Implementation of

[`TTSProvider`](../interfaces/TTSProvider.md).[`onError`](../interfaces/TTSProvider.md#onerror)

***

### onWordBoundary()?

> `optional` **onWordBoundary**: (`word`, `offsetMs`, `requestId`) => `void`

Defined in: [transport/elevenlabs-tts-provider.ts:88](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L88)

Word-level timing for caption synchronization (optional).
 Providers that support word timestamps (Cartesia, ElevenLabs) fire this
 for real-time caption alignment on the client.
 NOTE: This is for timing metadata only, NOT for output transcription.

#### Parameters

##### word

`string`

The spoken word

##### offsetMs

`number`

Offset from the start of synthesis for this requestId, in milliseconds

##### requestId

`number`

The requestId this word belongs to

#### Returns

`void`

#### Implementation of

[`TTSProvider`](../interfaces/TTSProvider.md).[`onWordBoundary`](../interfaces/TTSProvider.md#onwordboundary)

## Methods

### cancel()

> **cancel**(): `void`

Defined in: [transport/elevenlabs-tts-provider.ts:181](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L181)

Cancel any in-progress synthesis (best-effort). Called when the user
 interrupts (barge-in). Provider SHOULD stop generating audio as quickly
 as possible and clear internal buffers. Late-arriving audio chunks after
 cancel() are safe — VoiceSession filters them via requestId.

#### Returns

`void`

#### Implementation of

[`TTSProvider`](../interfaces/TTSProvider.md).[`cancel`](../interfaces/TTSProvider.md#cancel)

***

### configure()

> **configure**(`preferred`): [`TTSAudioConfig`](../interfaces/TTSAudioConfig.md)

Defined in: [transport/elevenlabs-tts-provider.ts:110](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L110)

Called once before start(). Provider receives the preferred output format
 (derived from the transport's outputSampleRate) and returns the actual
 format it will produce. If the provider can emit at the preferred rate
 natively, it SHOULD do so to avoid resampling overhead.

#### Parameters

##### preferred

[`TTSAudioConfig`](../interfaces/TTSAudioConfig.md)

The ideal output format (sampleRate, bitDepth, channels)

#### Returns

[`TTSAudioConfig`](../interfaces/TTSAudioConfig.md)

The actual output format the provider will produce

#### Implementation of

[`TTSProvider`](../interfaces/TTSProvider.md).[`configure`](../interfaces/TTSProvider.md#configure)

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [transport/elevenlabs-tts-provider.ts:128](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L128)

Open connection (WebSocket for streaming providers).

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TTSProvider`](../interfaces/TTSProvider.md).[`start`](../interfaces/TTSProvider.md#start)

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [transport/elevenlabs-tts-provider.ts:137](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L137)

Close connection and release resources.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TTSProvider`](../interfaces/TTSProvider.md).[`stop`](../interfaces/TTSProvider.md#stop)

***

### synthesize()

> **synthesize**(`text`, `requestId`, `options?`): `void`

Defined in: [transport/elevenlabs-tts-provider.ts:150](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L150)

Synthesize text into speech. Called with text chunks as they arrive
 from the LLM. The provider decides internally whether to buffer for
 sentence boundaries or stream immediately.

#### Parameters

##### text

`string`

Partial or complete text from LLM response

##### requestId

`number`

Monotonic ID correlating this text to a specific turn/response.
                  All onAudio/onDone callbacks for this text MUST carry the same requestId.

##### options?

###### flush?

`boolean`

If true, flush any buffered text to TTS now (does NOT mean end-of-request).

#### Returns

`void`

#### Implementation of

[`TTSProvider`](../interfaces/TTSProvider.md).[`synthesize`](../interfaces/TTSProvider.md#synthesize)
