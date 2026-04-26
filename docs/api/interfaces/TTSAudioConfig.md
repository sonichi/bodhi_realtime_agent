[bodhi-realtime-agent](../index.md) / TTSAudioConfig

# Interface: TTSAudioConfig

Defined in: [types/tts.ts:7](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L7)

Audio format descriptor for TTS output.
Returned by TTSProvider.configure() to indicate the actual output format.

## Properties

### bitDepth

> **bitDepth**: `number`

Defined in: [types/tts.ts:11](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L11)

Bits per sample (16).

***

### channels

> **channels**: `number`

Defined in: [types/tts.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L13)

Number of channels (1 = mono).

***

### encoding

> **encoding**: `"pcm"`

Defined in: [types/tts.ts:15](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L15)

Encoding format.

***

### sampleRate

> **sampleRate**: `number`

Defined in: [types/tts.ts:9](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tts.ts#L9)

Sample rate in Hz (e.g. 24000 for ElevenLabs, 44100 for Cartesia).
