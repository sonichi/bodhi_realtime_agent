[bodhi-realtime-agent](../index.md) / OpenAIRealtimeConfig

# Interface: OpenAIRealtimeConfig

Defined in: [transport/openai-realtime-transport.ts:34](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L34)

Configuration for constructing an OpenAIRealtimeTransport.

## Properties

### apiKey

> **apiKey**: `string`

Defined in: [transport/openai-realtime-transport.ts:36](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L36)

OpenAI API key.

***

### model?

> `optional` **model**: `string`

Defined in: [transport/openai-realtime-transport.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L38)

Model identifier (default: 'gpt-realtime').

***

### noiseReduction?

> `optional` **noiseReduction**: `Record`\<`string`, `unknown`\>

Defined in: [transport/openai-realtime-transport.ts:46](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L46)

Noise reduction configuration.

***

### transcriptionModel?

> `optional` **transcriptionModel**: `string` \| `null`

Defined in: [transport/openai-realtime-transport.ts:42](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L42)

Transcription model (default: 'gpt-4o-mini-transcribe'). Set to null to disable input transcription.

***

### turnDetection?

> `optional` **turnDetection**: `Record`\<`string`, `unknown`\>

Defined in: [transport/openai-realtime-transport.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L44)

Turn detection configuration.

***

### voice?

> `optional` **voice**: `string`

Defined in: [transport/openai-realtime-transport.ts:40](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/openai-realtime-transport.ts#L40)

Voice name (default: 'coral').
