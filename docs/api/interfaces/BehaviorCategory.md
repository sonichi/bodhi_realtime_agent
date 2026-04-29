[bodhi-realtime-agent](../index.md) / BehaviorCategory

# Interface: BehaviorCategory

Defined in: [types/behavior.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/behavior.ts#L14)

Declares a tunable behavior with discrete presets.

## Properties

### key

> **key**: `string`

Defined in: [types/behavior.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/behavior.ts#L16)

Unique category key — becomes the directive key (e.g. "pacing").

***

### presets

> **presets**: [`BehaviorPreset`](BehaviorPreset.md)[]

Defined in: [types/behavior.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/behavior.ts#L22)

Ordered presets. First preset is the default.

***

### scope?

> `optional` **scope**: `"session"` \| `"agent"`

Defined in: [types/behavior.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/behavior.ts#L24)

Directive scope. 'session' (default) persists across agent transfers.

***

### toolDescription

> **toolDescription**: `string`

Defined in: [types/behavior.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/behavior.ts#L20)

Tool description shown to the LLM for tool selection.

***

### toolName

> **toolName**: `string`

Defined in: [types/behavior.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/behavior.ts#L18)

Tool name auto-generated for the LLM (e.g. "set_pacing").
