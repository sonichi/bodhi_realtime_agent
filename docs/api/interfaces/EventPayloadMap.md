[bodhi-realtime-agent](../index.md) / EventPayloadMap

# Interface: EventPayloadMap

Defined in: [types/events.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L22)

Maps each event type string to its payload shape.
EventBus uses this mapped type for compile-time type safety on publish/subscribe.

## Example

```ts
eventBus.subscribe('agent.transfer', (payload) => {
  // payload is typed as { sessionId: string; fromAgent: string; toAgent: string }
});
```

## Properties

### agent.enter

> **agent.enter**: `object`

Defined in: [types/events.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L24)

#### agentName

> **agentName**: `string`

#### sessionId

> **sessionId**: `string`

***

### agent.exit

> **agent.exit**: `object`

Defined in: [types/events.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L25)

#### agentName

> **agentName**: `string`

#### sessionId

> **sessionId**: `string`

***

### agent.handoff

> **agent.handoff**: `object`

Defined in: [types/events.ts:28](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L28)

#### agentName

> **agentName**: `string`

#### sessionId

> **sessionId**: `string`

#### subagentName

> **subagentName**: `string`

#### toolCallId

> **toolCallId**: `string`

***

### agent.transfer

> **agent.transfer**: `object`

Defined in: [types/events.ts:26](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L26)

#### fromAgent

> **fromAgent**: `string`

#### sessionId

> **sessionId**: `string`

#### toAgent

> **toAgent**: `string`

***

### agent.transfer\_requested

> **agent.transfer\_requested**: `object`

Defined in: [types/events.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L27)

#### sessionId

> **sessionId**: `string`

#### toAgent

> **toAgent**: `string`

***

### context.compact

> **context.compact**: `object`

Defined in: [types/events.ts:59](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L59)

#### removedItems

> **removedItems**: `number`

#### sessionId

> **sessionId**: `string`

***

### gui.notification

> **gui.notification**: `object`

Defined in: [types/events.ts:47](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L47)

#### message

> **message**: `string`

#### sessionId

> **sessionId**: `string`

***

### gui.update

> **gui.update**: `object`

Defined in: [types/events.ts:46](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L46)

#### data

> **data**: `Record`\<`string`, `unknown`\>

#### sessionId

> **sessionId**: `string`

***

### session.close

> **session.close**: `object`

Defined in: [types/events.ts:51](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L51)

#### reason

> **reason**: `string`

#### sessionId

> **sessionId**: `string`

***

### session.goaway

> **session.goaway**: `object`

Defined in: [types/events.ts:58](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L58)

#### sessionId

> **sessionId**: `string`

#### timeLeft

> **timeLeft**: `string`

***

### session.resume

> **session.resume**: `object`

Defined in: [types/events.ts:57](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L57)

#### handle

> **handle**: `string`

#### sessionId

> **sessionId**: `string`

***

### session.start

> **session.start**: `object`

Defined in: [types/events.ts:50](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L50)

#### agentName

> **agentName**: `string`

#### sessionId

> **sessionId**: `string`

#### userId

> **userId**: `string`

***

### session.stateChange

> **session.stateChange**: `object`

Defined in: [types/events.ts:52](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L52)

#### fromState

> **fromState**: [`SessionState`](../type-aliases/SessionState.md)

#### sessionId

> **sessionId**: `string`

#### toState

> **toState**: [`SessionState`](../type-aliases/SessionState.md)

***

### subagent.notification

> **subagent.notification**: `object`

Defined in: [types/events.ts:64](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L64)

#### event

> **event**: [`ExternalEvent`](ExternalEvent.md)

#### result

> **result**: [`SubagentResult`](SubagentResult.md)

#### sessionId

> **sessionId**: `string`

***

### subagent.ui.response

> **subagent.ui.response**: `object`

Defined in: [types/events.ts:63](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L63)

#### response

> **response**: [`UIResponse`](UIResponse.md)

#### sessionId

> **sessionId**: `string`

***

### subagent.ui.send

> **subagent.ui.send**: `object`

Defined in: [types/events.ts:62](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L62)

#### payload

> **payload**: [`UIPayload`](UIPayload.md)

#### sessionId

> **sessionId**: `string`

***

### tool.call

> **tool.call**: [`ToolCall`](ToolCall.md) & `object`

Defined in: [types/events.ts:36](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L36)

#### Type Declaration

##### agentName

> **agentName**: `string`

##### sessionId

> **sessionId**: `string`

***

### tool.cancel

> **tool.cancel**: `object`

Defined in: [types/events.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L38)

#### sessionId

> **sessionId**: `string`

#### toolCallIds

> **toolCallIds**: `string`[]

***

### tool.result

> **tool.result**: [`ToolResult`](ToolResult.md) & `object`

Defined in: [types/events.ts:37](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L37)

#### Type Declaration

##### sessionId

> **sessionId**: `string`

***

### turn.end

> **turn.end**: `object`

Defined in: [types/events.ts:42](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L42)

#### sessionId

> **sessionId**: `string`

#### turnId

> **turnId**: `string`

***

### turn.interrupted

> **turn.interrupted**: `object`

Defined in: [types/events.ts:43](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L43)

#### sessionId

> **sessionId**: `string`

#### turnId

> **turnId**: `string`

***

### turn.start

> **turn.start**: `object`

Defined in: [types/events.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/events.ts#L41)

#### sessionId

> **sessionId**: `string`

#### turnId

> **turnId**: `string`
