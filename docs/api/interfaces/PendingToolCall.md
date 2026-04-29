[bodhi-realtime-agent](../index.md) / PendingToolCall

# Interface: PendingToolCall

Defined in: [types/session.ts:77](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L77)

Snapshot of a tool call that was in progress when a checkpoint was taken.

## Properties

### arguments

> **arguments**: `Record`\<`string`, `unknown`\>

Defined in: [types/session.ts:83](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L83)

Original arguments passed to the tool.

***

### startedAt

> **startedAt**: `number`

Defined in: [types/session.ts:85](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L85)

When execution started (Unix ms).

***

### subagentConfigName

> **subagentConfigName**: `string`

Defined in: [types/session.ts:81](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L81)

Name of the SubagentConfig handling this call.

***

### timeout

> **timeout**: `number`

Defined in: [types/session.ts:87](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L87)

Configured timeout in milliseconds.

***

### toolCallId

> **toolCallId**: `string`

Defined in: [types/session.ts:78](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L78)

***

### toolName

> **toolName**: `string`

Defined in: [types/session.ts:79](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L79)
