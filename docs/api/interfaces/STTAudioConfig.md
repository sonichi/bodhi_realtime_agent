[bodhi-realtime-agent](../index.md) / STTAudioConfig

# Interface: STTAudioConfig

Defined in: [types/transport.ts:28](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L28)

Audio format descriptor passed to an STT provider at configuration time.

## Properties

### bitDepth

> **bitDepth**: `number`

Defined in: [types/transport.ts:32](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L32)

Bits per sample (16).

***

### channels

> **channels**: `number`

Defined in: [types/transport.ts:34](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L34)

Number of channels (1 = mono).

***

### sampleRate

> **sampleRate**: `number`

Defined in: [types/transport.ts:30](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L30)

Sample rate in Hz (e.g. 16000 for Gemini, 24000 for OpenAI).
