[bodhi-realtime-agent](../index.md) / SubagentTask

# Interface: SubagentTask

Defined in: [types/conversation.ts:43](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L43)

Describes the work a subagent should perform (derived from a background tool call).

## Properties

### args

> **args**: `Record`\<`string`, `unknown`\>

Defined in: [types/conversation.ts:51](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L51)

Arguments originally passed to the tool.

***

### description

> **description**: `string`

Defined in: [types/conversation.ts:45](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L45)

Human-readable description of what the subagent should do.

***

### toolCallId

> **toolCallId**: `string`

Defined in: [types/conversation.ts:47](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L47)

Correlates back to the originating background tool call.

***

### toolName

> **toolName**: `string`

Defined in: [types/conversation.ts:49](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L49)

Name of the background tool that triggered this task.
