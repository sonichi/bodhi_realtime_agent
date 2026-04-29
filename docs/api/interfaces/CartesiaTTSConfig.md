[bodhi-realtime-agent](../index.md) / CartesiaTTSConfig

# Interface: CartesiaTTSConfig

Defined in: [transport/cartesia-tts-provider.ts:8](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/cartesia-tts-provider.ts#L8)

Configuration for the Cartesia TTS provider.

## Properties

### apiKey

> **apiKey**: `string`

Defined in: [transport/cartesia-tts-provider.ts:10](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/cartesia-tts-provider.ts#L10)

Cartesia API key. Required.

***

### emotion?

> `optional` **emotion**: `string`[]

Defined in: [transport/cartesia-tts-provider.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/cartesia-tts-provider.ts#L20)

Emotion tags (e.g. `['cheerful', 'friendly']`). Default: `[]`.

***

### language?

> `optional` **language**: `string`

Defined in: [transport/cartesia-tts-provider.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/cartesia-tts-provider.ts#L16)

ISO 639-1 language code (e.g. `'en'`). Default: `'en'`.

***

### modelId?

> `optional` **modelId**: `string`

Defined in: [transport/cartesia-tts-provider.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/cartesia-tts-provider.ts#L14)

Model identifier. Default: `'sonic-2'`.

***

### speed?

> `optional` **speed**: `number` \| `"normal"` \| `"slowest"` \| `"slow"` \| `"fast"` \| `"fastest"`

Defined in: [transport/cartesia-tts-provider.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/cartesia-tts-provider.ts#L18)

Speech speed control. Default: `'normal'`.

***

### voiceId

> **voiceId**: `string`

Defined in: [transport/cartesia-tts-provider.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/cartesia-tts-provider.ts#L12)

Cartesia voice ID. Required.
