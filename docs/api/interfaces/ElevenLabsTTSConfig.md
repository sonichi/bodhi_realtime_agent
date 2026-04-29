[bodhi-realtime-agent](../index.md) / ElevenLabsTTSConfig

# Interface: ElevenLabsTTSConfig

Defined in: [transport/elevenlabs-tts-provider.ts:8](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L8)

Configuration for the ElevenLabs TTS streaming provider.

## Properties

### apiKey

> **apiKey**: `string`

Defined in: [transport/elevenlabs-tts-provider.ts:10](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L10)

ElevenLabs API key (xi-api-key). Required.

***

### languageCode?

> `optional` **languageCode**: `string`

Defined in: [transport/elevenlabs-tts-provider.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L24)

BCP-47 language code for multilingual models.

***

### modelId?

> `optional` **modelId**: `string`

Defined in: [transport/elevenlabs-tts-provider.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L14)

Model identifier. Default: `'eleven_flash_v2_5'` (lowest latency).

***

### similarityBoost?

> `optional` **similarityBoost**: `number`

Defined in: [transport/elevenlabs-tts-provider.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L18)

Voice similarity boost (0.0-1.0). Default: `0.75`.

***

### stability?

> `optional` **stability**: `number`

Defined in: [transport/elevenlabs-tts-provider.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L16)

Voice stability (0.0-1.0). Default: `0.5`.

***

### style?

> `optional` **style**: `number`

Defined in: [transport/elevenlabs-tts-provider.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L20)

Voice expressiveness / style (0.0-1.0). Default: `0.0`.

***

### useSpeakerBoost?

> `optional` **useSpeakerBoost**: `boolean`

Defined in: [transport/elevenlabs-tts-provider.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L22)

Enhance voice clarity. Default: `true`.

***

### voiceId

> **voiceId**: `string`

Defined in: [transport/elevenlabs-tts-provider.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-tts-provider.ts#L12)

ElevenLabs voice ID (preset or cloned). Required.
