[bodhi-realtime-agent](../index.md) / TTSProvider

# Interface: TTSProvider

Defined in: [types/tts.ts:28](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L28)

Provider-agnostic interface for pluggable text-to-speech providers.

VoiceSession creates the provider, calls configure() with the preferred
output format, then start(). Text flows in via synthesize() with a
requestId for turn correlation; audio chunks flow out via onAudio callback
tagged with the same requestId. The provider handles streaming, buffering,
and chunked delivery internally.

## Properties

### onAudio()?

> `optional` **onAudio**: (`base64Pcm`, `durationMs`, `requestId`) => `void`

Defined in: [types/tts.ts:72](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L72)

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

***

### onDone()?

> `optional` **onDone**: (`requestId`) => `void`

Defined in: [types/tts.ts:78](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L78)

Synthesis completed for a request.
 Fired after the final audio chunk for the given requestId.
 VoiceSession uses this to gate turn completion.

#### Parameters

##### requestId

`number`

The requestId that has completed synthesis

#### Returns

`void`

***

### onError()?

> `optional` **onError**: (`error`, `fatal`) => `void`

Defined in: [types/tts.ts:91](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L91)

Error during synthesis. Non-fatal errors are logged;
 fatal errors trigger session close (fail-fast in V1).

#### Parameters

##### error

`Error`

##### fatal

`boolean`

#### Returns

`void`

***

### onWordBoundary()?

> `optional` **onWordBoundary**: (`word`, `offsetMs`, `requestId`) => `void`

Defined in: [types/tts.ts:87](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L87)

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

## Methods

### cancel()

> **cancel**(): `void`

Defined in: [types/tts.ts:64](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L64)

Cancel any in-progress synthesis (best-effort). Called when the user
 interrupts (barge-in). Provider SHOULD stop generating audio as quickly
 as possible and clear internal buffers. Late-arriving audio chunks after
 cancel() are safe — VoiceSession filters them via requestId.

#### Returns

`void`

***

### configure()

> **configure**(`preferred`): [`TTSAudioConfig`](TTSAudioConfig.md)

Defined in: [types/tts.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L38)

Called once before start(). Provider receives the preferred output format
 (derived from the transport's outputSampleRate) and returns the actual
 format it will produce. If the provider can emit at the preferred rate
 natively, it SHOULD do so to avoid resampling overhead.

#### Parameters

##### preferred

[`TTSAudioConfig`](TTSAudioConfig.md)

The ideal output format (sampleRate, bitDepth, channels)

#### Returns

[`TTSAudioConfig`](TTSAudioConfig.md)

The actual output format the provider will produce

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [types/tts.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L41)

Open connection (WebSocket for streaming providers).

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [types/tts.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L44)

Close connection and release resources.

#### Returns

`Promise`\<`void`\>

***

### synthesize()

> **synthesize**(`text`, `requestId`, `options?`): `void`

Defined in: [types/tts.ts:56](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L56)

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
