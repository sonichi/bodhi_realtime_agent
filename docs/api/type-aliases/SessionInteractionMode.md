[bodhi-realtime-agent](../index.md) / SessionInteractionMode

# Type Alias: SessionInteractionMode

> **SessionInteractionMode** = \{ `type`: `"main_agent"`; \} \| \{ `prompt?`: `string`; `toolCallId`: `string`; `type`: `"subagent_interaction"`; \}

Defined in: [core/interaction-mode.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/interaction-mode.ts#L13)

Discriminated union describing who currently owns user transcript.
