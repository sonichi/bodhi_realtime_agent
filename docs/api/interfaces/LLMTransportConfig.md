[bodhi-realtime-agent](../index.md) / LLMTransportConfig

# Interface: LLMTransportConfig

Defined in: [types/transport.ts:116](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L116)

Configuration for establishing a transport connection.

## Properties

### auth

> **auth**: [`TransportAuth`](../type-aliases/TransportAuth.md)

Defined in: [types/transport.ts:117](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L117)

***

### instructions?

> `optional` **instructions**: `string`

Defined in: [types/transport.ts:119](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L119)

***

### model

> **model**: `string`

Defined in: [types/transport.ts:118](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L118)

***

### providerOptions?

> `optional` **providerOptions**: `Record`\<`string`, `unknown`\>

Defined in: [types/transport.ts:126](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L126)

***

### responseModality?

> `optional` **responseModality**: `"text"` \| `"audio"`

Defined in: [types/transport.ts:125](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L125)

Response modality. Default: 'audio' (LLM-native speech).
 Set to 'text' when using an external TTSProvider.

***

### tools?

> `optional` **tools**: [`ToolDefinition`](ToolDefinition.md)[]

Defined in: [types/transport.ts:120](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L120)

***

### transcription?

> `optional` **transcription**: `object`

Defined in: [types/transport.ts:122](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L122)

#### input?

> `optional` **input**: `boolean`

#### output?

> `optional` **output**: `boolean`

***

### voice?

> `optional` **voice**: `string`

Defined in: [types/transport.ts:121](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L121)
