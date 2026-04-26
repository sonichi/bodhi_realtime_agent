[bodhi-realtime-agent](../index.md) / InteractiveSubagentConfig

# Interface: InteractiveSubagentConfig

Defined in: [agent/subagent-session.ts:58](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L58)

Extends SubagentConfig with interactive session options.

## Extends

- [`SubagentConfig`](SubagentConfig.md)

## Properties

### createInstance()?

> `optional` **createInstance**: () => [`SubagentConfig`](SubagentConfig.md)

Defined in: [types/agent.ts:94](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L94)

Optional factory that returns an isolated subagent config instance per handoff.
Use this when tool state must not be shared across concurrent background runs.

#### Returns

[`SubagentConfig`](SubagentConfig.md)

#### Inherited from

[`SubagentConfig`](SubagentConfig.md).[`createInstance`](SubagentConfig.md#createinstance)

***

### dispose()?

> `optional` **dispose**: () => `void` \| `Promise`\<`void`\>

Defined in: [types/agent.ts:96](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L96)

Optional cleanup function called when the subagent run ends (success, error, or abort).

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`SubagentConfig`](SubagentConfig.md).[`dispose`](SubagentConfig.md#dispose)

***

### inputTimeout?

> `optional` **inputTimeout**: `number`

Defined in: [agent/subagent-session.ts:62](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L62)

Timeout per waitForInput() call in ms. Default: 120_000 (2 min).

***

### instructions

> **instructions**: `string`

Defined in: [types/agent.ts:76](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L76)

System instructions for the subagent's LLM call.

#### Inherited from

[`SubagentConfig`](SubagentConfig.md).[`instructions`](SubagentConfig.md#instructions)

***

### interactive?

> `optional` **interactive**: `boolean`

Defined in: [agent/subagent-session.ts:60](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L60)

Whether this subagent supports interactive user input.

#### Overrides

[`SubagentConfig`](SubagentConfig.md).[`interactive`](SubagentConfig.md#interactive)

***

### maxInputRetries?

> `optional` **maxInputRetries**: `number`

Defined in: [agent/subagent-session.ts:64](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L64)

Max retries before cancellation on timeout. Default: 3.

***

### maxSteps?

> `optional` **maxSteps**: `number`

Defined in: [types/agent.ts:80](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L80)

Maximum number of LLM steps before stopping (default 5).

#### Inherited from

[`SubagentConfig`](SubagentConfig.md).[`maxSteps`](SubagentConfig.md#maxsteps)

***

### name

> **name**: `string`

Defined in: [types/agent.ts:74](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L74)

Unique name identifying this subagent configuration.

#### Inherited from

[`SubagentConfig`](SubagentConfig.md).[`name`](SubagentConfig.md#name)

***

### reasoningModel?

> `optional` **reasoningModel**: `LanguageModelV1`

Defined in: [types/agent.ts:87](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L87)

Optional Vercel AI SDK text model for this subagent’s `generateText` relay.
When omitted, the session default (`VoiceSessionConfig.model`) is used.

#### Inherited from

[`SubagentConfig`](SubagentConfig.md).[`reasoningModel`](SubagentConfig.md#reasoningmodel)

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [types/agent.ts:82](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L82)

Timeout in milliseconds for the entire subagent run.

#### Inherited from

[`SubagentConfig`](SubagentConfig.md).[`timeout`](SubagentConfig.md#timeout)

***

### tools

> **tools**: `Record`\<`string`, `unknown`\>

Defined in: [types/agent.ts:78](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L78)

Vercel AI SDK tool() definitions available to the subagent.

#### Inherited from

[`SubagentConfig`](SubagentConfig.md).[`tools`](SubagentConfig.md#tools)
