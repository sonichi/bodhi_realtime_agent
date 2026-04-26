[bodhi-realtime-agent](../index.md) / RunSubagentOptions

# Interface: RunSubagentOptions

Defined in: [agent/subagent-runner.ts:26](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-runner.ts#L26)

Options for running a background subagent via the Vercel AI SDK.

## Properties

### abortSignal?

> `optional` **abortSignal**: `AbortSignal`

Defined in: [agent/subagent-runner.ts:36](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-runner.ts#L36)

Signal to abort the subagent execution (e.g. on tool cancellation).

***

### config

> **config**: [`SubagentConfig`](SubagentConfig.md)

Defined in: [agent/subagent-runner.ts:28](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-runner.ts#L28)

Subagent configuration (instructions, tools, maxSteps).

***

### context

> **context**: [`SubagentContextSnapshot`](SubagentContextSnapshot.md)

Defined in: [agent/subagent-runner.ts:30](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-runner.ts#L30)

Conversation snapshot providing context for the subagent.

***

### hooks

> **hooks**: [`HooksManager`](../classes/HooksManager.md)

Defined in: [agent/subagent-runner.ts:32](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-runner.ts#L32)

Hook manager for onSubagentStep notifications.

***

### model

> **model**: `LanguageModelV1`

Defined in: [agent/subagent-runner.ts:34](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-runner.ts#L34)

Language model to use for the subagent's generateText call.

***

### session?

> `optional` **session**: [`SubagentSession`](SubagentSession.md)

Defined in: [agent/subagent-runner.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-runner.ts#L38)

Interactive session for user input. Required when config.interactive is true.
