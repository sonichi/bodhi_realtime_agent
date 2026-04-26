[bodhi-realtime-agent](../index.md) / ToolExecution

# Type Alias: ToolExecution

> **ToolExecution** = `"inline"` \| `"background"`

Defined in: [types/tool.ts:10](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L10)

How a tool is executed relative to the Gemini audio stream.
- `inline`: Executed synchronously — Gemini waits for the result before continuing.
- `background`: Handed off to a subagent — Gemini continues speaking while it runs.
