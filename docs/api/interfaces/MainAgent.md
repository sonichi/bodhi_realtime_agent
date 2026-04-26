[bodhi-realtime-agent](../index.md) / MainAgent

# Interface: MainAgent

Defined in: [types/agent.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L41)

Defines a top-level voice agent that Gemini interacts with directly.
Each agent has its own system instructions, tool set, and lifecycle hooks.
Agents are registered with VoiceSession and selected via agent transfers.

## Properties

### audioMode?

> `optional` **audioMode**: `"llm"` \| `"external"`

Defined in: [types/agent.ts:56](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L56)

Audio routing mode. 'llm' (default): audio flows through LLM transport. 'external': agent manages its own audio path (e.g., Twilio phone bridge). When 'external', LLM transport is disconnected during this agent's turn.

***

### ~~googleSearch?~~

> `optional` **googleSearch**: `boolean`

Defined in: [types/agent.ts:50](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L50)

Enable Gemini's built-in Google Search grounding for this agent.

#### Deprecated

Use providerOptions.googleSearch instead.

***

### greeting?

> `optional` **greeting**: `string`

Defined in: [types/agent.ts:65](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L65)

Optional greeting prompt sent to Gemini when this agent activates and a client is connected.
 Gemini will generate a spoken response based on this prompt.

***

### instructions

> **instructions**: `string` \| () => `string`

Defined in: [types/agent.ts:45](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L45)

System instructions sent to Gemini. Can be a static string or a factory function.

***

### language?

> `optional` **language**: `string`

Defined in: [types/agent.ts:54](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L54)

IETF BCP 47 language tag for this agent (e.g., 'zh-CN', 'es-ES', 'ja-JP'). When set, a language directive is prepended to the system instruction.

***

### name

> **name**: `string`

Defined in: [types/agent.ts:43](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L43)

Unique name used for routing (e.g. "main", "math_expert").

***

### providerOptions?

> `optional` **providerOptions**: `Record`\<`string`, `unknown`\>

Defined in: [types/agent.ts:52](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L52)

Provider-specific options passed to the transport during agent transfer.

***

### tools

> **tools**: [`ToolDefinition`](ToolDefinition.md)[]

Defined in: [types/agent.ts:47](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L47)

Tools available to Gemini when this agent is active.

## Methods

### onEnter()?

> `optional` **onEnter**(`ctx`): `Promise`\<`void`\>

Defined in: [types/agent.ts:58](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L58)

Called when this agent becomes the active agent (after a transfer or initial start).

#### Parameters

##### ctx

[`AgentContext`](AgentContext.md)

#### Returns

`Promise`\<`void`\>

***

### onExit()?

> `optional` **onExit**(`ctx`): `Promise`\<`void`\>

Defined in: [types/agent.ts:60](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L60)

Called when this agent is being replaced by another agent.

#### Parameters

##### ctx

[`AgentContext`](AgentContext.md)

#### Returns

`Promise`\<`void`\>

***

### onTurnCompleted()?

> `optional` **onTurnCompleted**(`ctx`, `transcript`): `Promise`\<`void`\>

Defined in: [types/agent.ts:62](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L62)

Called after each completed turn while this agent is active.

#### Parameters

##### ctx

[`AgentContext`](AgentContext.md)

##### transcript

`string`

#### Returns

`Promise`\<`void`\>
