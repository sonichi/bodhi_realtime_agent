[bodhi-realtime-agent](../index.md) / ElevenLabsSTTConfig

# Interface: ElevenLabsSTTConfig

Defined in: [transport/elevenlabs-stt-provider.ts:7](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L7)

Configuration for the ElevenLabs Scribe v2 Realtime STT provider.

## Properties

### apiKey

> **apiKey**: `string`

Defined in: [transport/elevenlabs-stt-provider.ts:9](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L9)

ElevenLabs API key (xi-api-key). Required.

***

### languageCode?

> `optional` **languageCode**: `string`

Defined in: [transport/elevenlabs-stt-provider.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L13)

BCP-47 language code. Default: `'en'`.

***

### model?

> `optional` **model**: `string`

Defined in: [transport/elevenlabs-stt-provider.ts:11](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/elevenlabs-stt-provider.ts#L11)

Model identifier. Default: `'scribe_v2'`.
