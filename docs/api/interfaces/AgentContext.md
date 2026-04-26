[bodhi-realtime-agent](../index.md) / AgentContext

# Interface: AgentContext

Defined in: [types/agent.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L12)

Runtime context passed to agent lifecycle hooks (onEnter, onExit, onTurnCompleted).
Provides read access to session state and the ability to inject messages.

## Properties

### agentName

> **agentName**: `string`

Defined in: [types/agent.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L16)

Name of the agent receiving this context.

***

### sessionId

> **sessionId**: `string`

Defined in: [types/agent.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L14)

Current session identifier.

## Methods

### getMemoryFacts()

> **getMemoryFacts**(): [`MemoryFact`](MemoryFact.md)[]

Defined in: [types/agent.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L22)

Retrieve all memory facts currently stored for this user.

#### Returns

[`MemoryFact`](MemoryFact.md)[]

***

### getRecentTurns()

> **getRecentTurns**(`count?`): [`ConversationItem`](ConversationItem.md)[]

Defined in: [types/agent.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L20)

Retrieve the most recent conversation turns (default 10).

#### Parameters

##### count?

`number`

#### Returns

[`ConversationItem`](ConversationItem.md)[]

***

### injectSystemMessage()

> **injectSystemMessage**(`text`): `void`

Defined in: [types/agent.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L18)

Inject a system-level message into the conversation (visible to the model on next turn).

#### Parameters

##### text

`string`

#### Returns

`void`

***

### requestTransfer()

> **requestTransfer**(`toAgent`): `void`

Defined in: [types/agent.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L24)

Request an asynchronous transfer to another agent (fires on next tick to avoid re-entrancy).

#### Parameters

##### toAgent

`string`

#### Returns

`void`

***

### sendAudioToClient()?

> `optional` **sendAudioToClient**(`data`): `void`

Defined in: [types/agent.ts:31](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L31)

Send raw PCM audio to the connected client as a binary frame.

#### Parameters

##### data

`Buffer`

#### Returns

`void`

***

### sendJsonToClient()

> **sendJsonToClient**(`message`): `void`

Defined in: [types/agent.ts:29](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L29)

Send a JSON message to the connected client.

#### Parameters

##### message

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### setExternalAudioHandler()?

> `optional` **setExternalAudioHandler**(`handler`): `void`

Defined in: [types/agent.ts:33](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L33)

Register/unregister an external audio handler for client mic frames.

#### Parameters

##### handler

(`data`) => `void` | `null`

#### Returns

`void`

***

### stopBufferingAndDrain()

> **stopBufferingAndDrain**(`handler`): `void`

Defined in: [types/agent.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L27)

Stop buffering client audio and drain buffered chunks through the handler.
 Used by external audio agents (e.g., Twilio) to flush audio accumulated during the dial gap.

#### Parameters

##### handler

(`chunk`) => `void`

#### Returns

`void`
