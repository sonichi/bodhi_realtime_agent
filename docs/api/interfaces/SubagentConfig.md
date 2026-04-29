[bodhi-realtime-agent](../index.md) / SubagentConfig

# Interface: SubagentConfig

Defined in: [types/agent.ts:72](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L72)

Configuration for a background subagent that runs via the Vercel AI SDK.
Subagents handle long-running tool calls asynchronously while Gemini continues speaking.

## Extended by

- [`InteractiveSubagentConfig`](InteractiveSubagentConfig.md)

## Properties

### createInstance()?

> `optional` **createInstance**: () => `SubagentConfig`

Defined in: [types/agent.ts:94](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L94)

Optional factory that returns an isolated subagent config instance per handoff.
Use this when tool state must not be shared across concurrent background runs.

#### Returns

`SubagentConfig`

***

### dispose()?

> `optional` **dispose**: () => `void` \| `Promise`\<`void`\>

Defined in: [types/agent.ts:96](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L96)

Optional cleanup function called when the subagent run ends (success, error, or abort).

#### Returns

`void` \| `Promise`\<`void`\>

***

### instructions

> **instructions**: `string`

Defined in: [types/agent.ts:76](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L76)

System instructions for the subagent's LLM call.

***

### interactive?

> `optional` **interactive**: `boolean`

Defined in: [types/agent.ts:89](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L89)

When true, a SubagentSession with user interaction capabilities is created.

***

### maxSteps?

> `optional` **maxSteps**: `number`

Defined in: [types/agent.ts:80](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L80)

Maximum number of LLM steps before stopping (default 5).

***

### name

> **name**: `string`

Defined in: [types/agent.ts:74](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L74)

Unique name identifying this subagent configuration.

***

### reasoningModel?

> `optional` **reasoningModel**: `LanguageModelV1`

Defined in: [types/agent.ts:87](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L87)

Optional Vercel AI SDK text model for this subagent’s `generateText` relay.
When omitted, the session default (`VoiceSessionConfig.model`) is used.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [types/agent.ts:82](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L82)

Timeout in milliseconds for the entire subagent run.

***

### tools

> **tools**: `Record`\<`string`, `unknown`\>

Defined in: [types/agent.ts:78](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L78)

Vercel AI SDK tool() definitions available to the subagent.
