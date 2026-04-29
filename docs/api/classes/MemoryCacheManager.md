[bodhi-realtime-agent](../index.md) / MemoryCacheManager

# Class: MemoryCacheManager

Defined in: [core/memory-cache-manager.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/memory-cache-manager.ts#L13)

Caches memory facts from a MemoryStore for quick in-session access.

Extracted from VoiceSession to isolate the memory caching concern.
Callers use `refresh()` to reload from the store and `facts` to read
the latest cached snapshot. Failures during refresh are non-fatal —
the previous cache is retained.

## Constructors

### Constructor

> **new MemoryCacheManager**(`store`, `userId`): `MemoryCacheManager`

Defined in: [core/memory-cache-manager.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/memory-cache-manager.ts#L16)

#### Parameters

##### store

[`MemoryStore`](../interfaces/MemoryStore.md)

##### userId

`string`

#### Returns

`MemoryCacheManager`

## Accessors

### facts

#### Get Signature

> **get** **facts**(): [`MemoryFact`](../interfaces/MemoryFact.md)[]

Defined in: [core/memory-cache-manager.ts:31](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/memory-cache-manager.ts#L31)

Return the current cached facts.

##### Returns

[`MemoryFact`](../interfaces/MemoryFact.md)[]

## Methods

### refresh()

> **refresh**(): `Promise`\<`void`\>

Defined in: [core/memory-cache-manager.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/memory-cache-manager.ts#L22)

Reload cached facts from the store. Best-effort: keeps stale cache on failure.

#### Returns

`Promise`\<`void`\>
