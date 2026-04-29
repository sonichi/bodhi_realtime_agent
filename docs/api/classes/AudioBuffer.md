[bodhi-realtime-agent](../index.md) / AudioBuffer

# Class: AudioBuffer

Defined in: [transport/audio-buffer.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/audio-buffer.ts#L13)

Bounded ring buffer for PCM audio chunks.
When the buffer exceeds its capacity, the oldest chunks are dropped first.
Used by ClientTransport to buffer audio during agent transfers and reconnections.

## Constructors

### Constructor

> **new AudioBuffer**(`maxDurationMs?`): `AudioBuffer`

Defined in: [transport/audio-buffer.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/audio-buffer.ts#L18)

#### Parameters

##### maxDurationMs?

`number` = `DEFAULT_MAX_DURATION_MS`

#### Returns

`AudioBuffer`

## Accessors

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Defined in: [transport/audio-buffer.ts:53](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/audio-buffer.ts#L53)

##### Returns

`boolean`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [transport/audio-buffer.ts:49](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/audio-buffer.ts#L49)

##### Returns

`number`

## Methods

### clear()

> **clear**(): `void`

Defined in: [transport/audio-buffer.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/audio-buffer.ts#L44)

#### Returns

`void`

***

### drain()

> **drain**(): `Buffer`\<`ArrayBufferLike`\>[]

Defined in: [transport/audio-buffer.ts:37](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/audio-buffer.ts#L37)

Remove and return all buffered chunks, resetting the buffer to empty.

#### Returns

`Buffer`\<`ArrayBufferLike`\>[]

***

### push()

> **push**(`chunk`): `void`

Defined in: [transport/audio-buffer.ts:23](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/audio-buffer.ts#L23)

Add an audio chunk, dropping oldest chunks if the buffer is full.

#### Parameters

##### chunk

`Buffer`

#### Returns

`void`
