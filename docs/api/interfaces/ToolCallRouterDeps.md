[bodhi-realtime-agent](../index.md) / ToolCallRouterDeps

# Interface: ToolCallRouterDeps

Defined in: [core/tool-call-router.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L13)

Callbacks that the ToolCallRouter needs from VoiceSession.

## Properties

### agentRouter

> **agentRouter**: [`AgentRouter`](../classes/AgentRouter.md)

Defined in: [core/tool-call-router.ts:15](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L15)

***

### conversationContext

> **conversationContext**: [`ConversationContext`](../classes/ConversationContext.md)

Defined in: [core/tool-call-router.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L16)

***

### notificationQueue

> **notificationQueue**: [`BackgroundNotificationQueue`](../classes/BackgroundNotificationQueue.md)

Defined in: [core/tool-call-router.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L17)

***

### subagentConfigs

> **subagentConfigs**: `Record`\<`string`, [`SubagentConfig`](SubagentConfig.md)\>

Defined in: [core/tool-call-router.ts:19](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L19)

***

### toolExecutor

> **toolExecutor**: [`ToolExecutor`](../classes/ToolExecutor.md)

Defined in: [core/tool-call-router.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L14)

***

### transcriptManager

> **transcriptManager**: [`TranscriptManager`](../classes/TranscriptManager.md)

Defined in: [core/tool-call-router.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L18)

## Methods

### log()

> **log**(`msg`): `void`

Defined in: [core/tool-call-router.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L27)

Diagnostic log.

#### Parameters

##### msg

`string`

#### Returns

`void`

***

### reportError()

> **reportError**(`component`, `error`): `void`

Defined in: [core/tool-call-router.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L25)

Report an error via hooks/logging.

#### Parameters

##### component

`string`

##### error

`unknown`

#### Returns

`void`

***

### sendToolResult()

> **sendToolResult**(`result`): `void`

Defined in: [core/tool-call-router.ts:21](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L21)

Send a tool result back to the LLM transport.

#### Parameters

##### result

[`TransportToolResult`](TransportToolResult.md)

#### Returns

`void`

***

### transfer()

> **transfer**(`toAgent`): `Promise`\<`void`\>

Defined in: [core/tool-call-router.ts:23](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L23)

Trigger an agent transfer.

#### Parameters

##### toAgent

`string`

#### Returns

`Promise`\<`void`\>
