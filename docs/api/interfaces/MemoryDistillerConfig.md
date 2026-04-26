[bodhi-realtime-agent](../index.md) / MemoryDistillerConfig

# Interface: MemoryDistillerConfig

Defined in: [memory/memory-distiller.ts:21](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/memory-distiller.ts#L21)

Configuration for the MemoryDistiller.

## Properties

### extractionTimeoutMs?

> `optional` **extractionTimeoutMs**: `number`

Defined in: [memory/memory-distiller.ts:29](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/memory-distiller.ts#L29)

Timeout for each extraction LLM call in milliseconds (default 30 000).

***

### sessionId

> **sessionId**: `string`

Defined in: [memory/memory-distiller.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/memory-distiller.ts#L25)

Session ID for error reporting.

***

### turnFrequency?

> `optional` **turnFrequency**: `number`

Defined in: [memory/memory-distiller.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/memory-distiller.ts#L27)

Extract every N turns (default 5).

***

### userId

> **userId**: `string`

Defined in: [memory/memory-distiller.ts:23](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/memory-distiller.ts#L23)

User whose memory to manage.
