[bodhi-realtime-agent](../index.md) / ReplayItem

# Type Alias: ReplayItem

> **ReplayItem** = \{ `role`: `"user"` \| `"assistant"`; `text`: `string`; `type`: `"text"`; \} \| \{ `args`: `Record`\<`string`, `unknown`\>; `id`: `string`; `name`: `string`; `type`: `"tool_call"`; \} \| \{ `error?`: `string`; `id`: `string`; `name`: `string`; `result`: `unknown`; `type`: `"tool_result"`; \} \| \{ `base64Data`: `string`; `mimeType`: `string`; `role`: `"user"`; `type`: `"file"`; \} \| \{ `fromAgent`: `string`; `toAgent`: `string`; `type`: `"transfer"`; \}

Defined in: [types/transport.ts:98](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L98)

Rich replay item for reconnect/transfer recovery.
Preserves the full conversation structure — text, tool calls/results, files,
and agent transfers — so that recovery is lossless even for multimodal and
tool-heavy sessions.
