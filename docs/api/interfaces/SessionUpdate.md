[bodhi-realtime-agent](../index.md) / SessionUpdate

# Interface: SessionUpdate

Defined in: [types/transport.ts:136](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L136)

Partial session update — used for updateSession() and transferSession().

## Properties

### instructions?

> `optional` **instructions**: `string`

Defined in: [types/transport.ts:137](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L137)

***

### providerOptions?

> `optional` **providerOptions**: `Record`\<`string`, `unknown`\>

Defined in: [types/transport.ts:142](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L142)

***

### responseModality?

> `optional` **responseModality**: `"text"` \| `"audio"`

Defined in: [types/transport.ts:141](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L141)

Response modality override. Used to preserve text mode across
 agent transfers and reconnects when TTSProvider is configured.

***

### tools?

> `optional` **tools**: [`ToolDefinition`](ToolDefinition.md)[]

Defined in: [types/transport.ts:138](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L138)
