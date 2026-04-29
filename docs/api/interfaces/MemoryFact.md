[bodhi-realtime-agent](../index.md) / MemoryFact

# Interface: MemoryFact

Defined in: [types/memory.ts:7](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/memory.ts#L7)

A single piece of durable information extracted from conversation about the user.

## Properties

### category

> **category**: [`MemoryCategory`](../type-aliases/MemoryCategory.md)

Defined in: [types/memory.ts:11](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/memory.ts#L11)

Classification of this fact.

***

### content

> **content**: `string`

Defined in: [types/memory.ts:9](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/memory.ts#L9)

The fact expressed as a self-contained statement.

***

### timestamp

> **timestamp**: `number`

Defined in: [types/memory.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/memory.ts#L13)

When this fact was extracted (Unix ms). 0 if parsed from storage.
