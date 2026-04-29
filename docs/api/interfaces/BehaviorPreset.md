[bodhi-realtime-agent](../index.md) / BehaviorPreset

# Interface: BehaviorPreset

Defined in: [types/behavior.ts:4](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/behavior.ts#L4)

A single preset within a behavior category.

## Properties

### directive

> **directive**: `string` \| `null`

Defined in: [types/behavior.ts:10](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/behavior.ts#L10)

Directive text injected into model context. null = clear directive.

***

### label

> **label**: `string`

Defined in: [types/behavior.ts:8](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/behavior.ts#L8)

Human-readable label for client UI display.

***

### name

> **name**: `string`

Defined in: [types/behavior.ts:6](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/behavior.ts#L6)

Machine-readable preset name (enum value in tool schema).
