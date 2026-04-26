[bodhi-realtime-agent](../index.md) / SubagentResult

# Interface: SubagentResult

Defined in: [types/conversation.ts:55](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L55)

The output produced by a subagent after completing its task.

## Properties

### stepCount

> **stepCount**: `number`

Defined in: [types/conversation.ts:59](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L59)

How many LLM steps the subagent took.

***

### text

> **text**: `string`

Defined in: [types/conversation.ts:57](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L57)

The textual result to relay back to Gemini as a tool response.

***

### uiPayload?

> `optional` **uiPayload**: [`UIPayload`](UIPayload.md)

Defined in: [types/conversation.ts:61](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L61)

Optional structured UI payload for dual-channel (voice + screen) delivery.
