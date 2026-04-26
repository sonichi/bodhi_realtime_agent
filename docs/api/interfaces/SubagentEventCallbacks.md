[bodhi-realtime-agent](../index.md) / SubagentEventCallbacks

# Interface: SubagentEventCallbacks

Defined in: [agent/agent-router.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L41)

Callbacks for interactive subagent lifecycle events.

## Properties

### onMessage()?

> `optional` **onMessage**: (`toolCallId`, `msg`) => `void`

Defined in: [agent/agent-router.ts:43](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L43)

Fired when a subagent sends a message (question, progress) to the user.

#### Parameters

##### toolCallId

`string`

##### msg

[`SubagentMessage`](SubagentMessage.md)

#### Returns

`void`

***

### onSessionEnd()?

> `optional` **onSessionEnd**: (`toolCallId`) => `void`

Defined in: [agent/agent-router.ts:45](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L45)

Fired when a subagent session transitions to a terminal state (completed/cancelled).

#### Parameters

##### toolCallId

`string`

#### Returns

`void`
