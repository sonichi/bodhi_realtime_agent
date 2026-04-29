[bodhi-realtime-agent](../index.md) / TransportCapabilities

# Interface: TransportCapabilities

Defined in: [types/transport.ts:6](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L6)

Static capabilities — orchestrator branches on these, never on provider names.

## Properties

### contextCompression

> **contextCompression**: `boolean`

Defined in: [types/transport.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L18)

Supports server-side context compression (Gemini: yes, OpenAI: no).

***

### groundingMetadata

> **groundingMetadata**: `boolean`

Defined in: [types/transport.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L20)

Provides grounding metadata with search citations (Gemini: yes, OpenAI: no).

***

### inPlaceSessionUpdate

> **inPlaceSessionUpdate**: `boolean`

Defined in: [types/transport.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L14)

Supports in-place session update without reconnection (OpenAI: yes, Gemini: no).

***

### messageTruncation

> **messageTruncation**: `boolean`

Defined in: [types/transport.ts:8](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L8)

Can truncate server-side message at audio playback position (OpenAI: yes, Gemini: no).

***

### sessionResumption

> **sessionResumption**: `boolean`

Defined in: [types/transport.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L16)

Supports session resumption on disconnect (Gemini: yes, OpenAI: no).

***

### textResponseModality?

> `optional` **textResponseModality**: `boolean`

Defined in: [types/transport.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L24)

Supports text-only response modality (required for external TTS).
 Optional — defaults to false. Existing custom transport implementations
 are unaffected until they want to support TTS.

***

### turnDetection

> **turnDetection**: `boolean`

Defined in: [types/transport.ts:10](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L10)

Server-side VAD / end-of-turn detection (V1 requires true).

***

### userTranscription

> **userTranscription**: `boolean`

Defined in: [types/transport.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L12)

Provides transcriptions of user audio input.
