[bodhi-realtime-agent](../index.md) / JsonMemoryStore

# Class: JsonMemoryStore

Defined in: [memory/json-memory-store.ts:31](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/json-memory-store.ts#L31)

File-based MemoryStore that persists facts and directives as a JSON file per user.

File layout (`{baseDir}/{userId}.json`):
```json
{
  "directives": { "pacing": "slow" },
  "facts": [
    { "content": "Prefers dark mode", "category": "preference" }
  ]
}
```

All writes use `write-file-atomic` for crash-safe persistence.

## Implements

- [`MemoryStore`](../interfaces/MemoryStore.md)

## Constructors

### Constructor

> **new JsonMemoryStore**(`baseDir`): `JsonMemoryStore`

Defined in: [memory/json-memory-store.ts:32](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/json-memory-store.ts#L32)

#### Parameters

##### baseDir

`string`

#### Returns

`JsonMemoryStore`

## Methods

### addFacts()

> **addFacts**(`userId`, `facts`): `Promise`\<`void`\>

Defined in: [memory/json-memory-store.ts:34](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/json-memory-store.ts#L34)

Append new facts to the user's memory (creates the store entry if needed).

#### Parameters

##### userId

`string`

##### facts

[`MemoryFact`](../interfaces/MemoryFact.md)[]

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`MemoryStore`](../interfaces/MemoryStore.md).[`addFacts`](../interfaces/MemoryStore.md#addfacts)

***

### getAll()

> **getAll**(`userId`): `Promise`\<[`MemoryFact`](../interfaces/MemoryFact.md)[]\>

Defined in: [memory/json-memory-store.ts:45](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/json-memory-store.ts#L45)

Retrieve all stored facts for a user (empty array if none).

#### Parameters

##### userId

`string`

#### Returns

`Promise`\<[`MemoryFact`](../interfaces/MemoryFact.md)[]\>

#### Implementation of

[`MemoryStore`](../interfaces/MemoryStore.md).[`getAll`](../interfaces/MemoryStore.md#getall)

***

### getDirectives()

> **getDirectives**(`userId`): `Promise`\<`Record`\<`string`, `string`\>\>

Defined in: [memory/json-memory-store.ts:61](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/json-memory-store.ts#L61)

Retrieve structured directives (e.g. behavior presets) for a user.

#### Parameters

##### userId

`string`

#### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

#### Implementation of

[`MemoryStore`](../interfaces/MemoryStore.md).[`getDirectives`](../interfaces/MemoryStore.md#getdirectives)

***

### replaceAll()

> **replaceAll**(`userId`, `facts`): `Promise`\<`void`\>

Defined in: [memory/json-memory-store.ts:54](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/json-memory-store.ts#L54)

Atomically replace all facts for a user (used by consolidation).

#### Parameters

##### userId

`string`

##### facts

[`MemoryFact`](../interfaces/MemoryFact.md)[]

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`MemoryStore`](../interfaces/MemoryStore.md).[`replaceAll`](../interfaces/MemoryStore.md#replaceall)

***

### setDirectives()

> **setDirectives**(`userId`, `directives`): `Promise`\<`void`\>

Defined in: [memory/json-memory-store.ts:66](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/memory/json-memory-store.ts#L66)

Persist structured directives for a user (preserves existing facts).

#### Parameters

##### userId

`string`

##### directives

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`MemoryStore`](../interfaces/MemoryStore.md).[`setDirectives`](../interfaces/MemoryStore.md#setdirectives)
