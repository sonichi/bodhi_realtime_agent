[bodhi-realtime-agent](../index.md) / ToolContext

# Interface: ToolContext

Defined in: [types/tool.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L38)

Runtime context provided to a tool's execute function.
Includes identifiers for correlation and an AbortSignal for cancellation.

## Properties

### abortSignal

> **abortSignal**: `AbortSignal`

Defined in: [types/tool.ts:46](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L46)

Aborted when the tool call is cancelled (user interruption or timeout).

***

### agentName

> **agentName**: `string`

Defined in: [types/tool.ts:42](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L42)

Name of the agent that owns this tool.

***

### sessionId

> **sessionId**: `string`

Defined in: [types/tool.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L44)

Session in which this tool call is happening.

***

### toolCallId

> **toolCallId**: `string`

Defined in: [types/tool.ts:40](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L40)

Unique identifier for this specific tool invocation.

## Methods

### sendJsonToClient()?

> `optional` **sendJsonToClient**(`message`): `void`

Defined in: [types/tool.ts:48](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L48)

Send a JSON message to the connected client (delivered as a WebSocket text frame).

#### Parameters

##### message

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### setDirective()?

> `optional` **setDirective**(`key`, `value`, `scope?`): `void`

Defined in: [types/tool.ts:58](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L58)

Set an active directive by category key.
Directives are reinforced every turn via sendClientContent injection,
keeping them fresh in Gemini's context to prevent behavioral drift.
Pass null to clear a directive.

#### Parameters

##### key

`string`

##### value

`string` | `null`

##### scope?

— `'session'` persists across agent transfers (e.g. pacing);
               `'agent'` (default) is cleared on agent transfer.

`"session"` | `"agent"`

#### Returns

`void`
