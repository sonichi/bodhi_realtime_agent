[bodhi-realtime-agent](../index.md) / runSubagent

# Function: runSubagent()

> **runSubagent**(`options`): `Promise`\<[`SubagentResult`](../interfaces/SubagentResult.md)\>

Defined in: [agent/subagent-runner.ts:153](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-runner.ts#L153)

Execute a background subagent using the Vercel AI SDK's generateText.
Fires onSubagentStep hooks after each LLM step.
Returns the final text result and step count.

When `config.interactive` is true and a `session` is provided, an `ask_user`
tool is injected and this function owns the session's terminal transitions
(complete on success, cancel on error).

## Parameters

### options

[`RunSubagentOptions`](../interfaces/RunSubagentOptions.md)

## Returns

`Promise`\<[`SubagentResult`](../interfaces/SubagentResult.md)\>
