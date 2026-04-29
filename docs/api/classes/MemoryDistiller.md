[bodhi-realtime-agent](../index.md) / MemoryDistiller

# Class: MemoryDistiller

Defined in: [memory/memory-distiller.ts:46](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/memory-distiller.ts#L46)

Extracts durable user facts from conversation and persists them to a MemoryStore.

**Extraction triggers:**
- `onTurnEnd()`: Every `turnFrequency` turns (default 5th turn).
- `onCheckpoint()`: Immediately (e.g. on agent transfer, tool result, session close).
- `forceExtract()`: Awaitable on-demand extraction.

**Coalescing:** Only one extraction runs at a time (`extractionInFlight` flag).
Additional triggers while an extraction is running are silently skipped.

**Merge-on-write:** Each extraction produces the COMPLETE updated fact list
(existing + new, deduplicated, contradictions resolved) and replaces all facts.

## Constructors

### Constructor

> **new MemoryDistiller**(`conversationContext`, `memoryStore`, `hooks`, `model`, `config`): `MemoryDistiller`

Defined in: [memory/memory-distiller.ts:54](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/memory-distiller.ts#L54)

#### Parameters

##### conversationContext

[`ConversationContext`](ConversationContext.md)

##### memoryStore

[`MemoryStore`](../interfaces/MemoryStore.md)

##### hooks

[`HooksManager`](HooksManager.md)

##### model

`LanguageModelV1`

##### config

[`MemoryDistillerConfig`](../interfaces/MemoryDistillerConfig.md)

#### Returns

`MemoryDistiller`

## Methods

### forceExtract()

> **forceExtract**(): `Promise`\<`void`\>

Defined in: [memory/memory-distiller.ts:78](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/memory-distiller.ts#L78)

#### Returns

`Promise`\<`void`\>

***

### onCheckpoint()

> **onCheckpoint**(): `void`

Defined in: [memory/memory-distiller.ts:74](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/memory-distiller.ts#L74)

#### Returns

`void`

***

### onTurnEnd()

> **onTurnEnd**(): `void`

Defined in: [memory/memory-distiller.ts:67](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/memory-distiller.ts#L67)

#### Returns

`void`
