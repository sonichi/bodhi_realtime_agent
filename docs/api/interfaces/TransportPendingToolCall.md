[bodhi-realtime-agent](../index.md) / TransportPendingToolCall

# Interface: TransportPendingToolCall

Defined in: [types/transport.ts:175](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L175)

Snapshot of an in-flight tool call for reconnect recovery. Named TransportPendingToolCall
 to avoid conflict with PendingToolCall in session.ts (used for session checkpoints).

## Properties

### agentName

> **agentName**: `string`

Defined in: [types/transport.ts:193](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L193)

Name of the agent that owned this tool call at dispatch time.

***

### args

> **args**: `Record`\<`string`, `unknown`\>

Defined in: [types/transport.ts:181](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L181)

Parsed arguments.

***

### execution

> **execution**: `"inline"` \| `"background"`

Defined in: [types/transport.ts:191](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L191)

Whether this was an inline or background tool call.

***

### id

> **id**: `string`

Defined in: [types/transport.ts:177](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L177)

Transport-assigned tool call ID (used for idempotency dedup).

***

### name

> **name**: `string`

Defined in: [types/transport.ts:179](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L179)

Tool name.

***

### result?

> `optional` **result**: `unknown`

Defined in: [types/transport.ts:185](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L185)

Result value (present only when status === 'completed').

***

### startedAt

> **startedAt**: `number`

Defined in: [types/transport.ts:187](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L187)

When execution started (Unix ms). Used for timeout calculation on recovery.

***

### status

> **status**: `"executing"` \| `"completed"`

Defined in: [types/transport.ts:183](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L183)

Whether the tool is still running or has completed.

***

### timeoutMs?

> `optional` **timeoutMs**: `number`

Defined in: [types/transport.ts:189](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L189)

Max execution time in ms. Transport skips re-execution if wall-clock exceeds this.
