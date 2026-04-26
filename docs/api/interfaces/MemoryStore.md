[bodhi-realtime-agent](../index.md) / MemoryStore

# Interface: MemoryStore

Defined in: [types/memory.ts:21](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/memory.ts#L21)

Persistence interface for per-user memory facts and directives.
Implementations must be safe for concurrent reads and writes.
See JsonMemoryStore for the built-in file-based implementation.

## Methods

### addFacts()

> **addFacts**(`userId`, `facts`): `Promise`\<`void`\>

Defined in: [types/memory.ts:23](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/memory.ts#L23)

Append new facts to the user's memory (creates the store entry if needed).

#### Parameters

##### userId

`string`

##### facts

[`MemoryFact`](MemoryFact.md)[]

#### Returns

`Promise`\<`void`\>

***

### getAll()

> **getAll**(`userId`): `Promise`\<[`MemoryFact`](MemoryFact.md)[]\>

Defined in: [types/memory.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/memory.ts#L25)

Retrieve all stored facts for a user (empty array if none).

#### Parameters

##### userId

`string`

#### Returns

`Promise`\<[`MemoryFact`](MemoryFact.md)[]\>

***

### getDirectives()

> **getDirectives**(`userId`): `Promise`\<`Record`\<`string`, `string`\>\>

Defined in: [types/memory.ts:29](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/memory.ts#L29)

Retrieve structured directives (e.g. behavior presets) for a user.

#### Parameters

##### userId

`string`

#### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

***

### replaceAll()

> **replaceAll**(`userId`, `facts`): `Promise`\<`void`\>

Defined in: [types/memory.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/memory.ts#L27)

Atomically replace all facts for a user (used by consolidation).

#### Parameters

##### userId

`string`

##### facts

[`MemoryFact`](MemoryFact.md)[]

#### Returns

`Promise`\<`void`\>

***

### setDirectives()

> **setDirectives**(`userId`, `directives`): `Promise`\<`void`\>

Defined in: [types/memory.ts:31](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/memory.ts#L31)

Persist structured directives for a user (preserves existing facts).

#### Parameters

##### userId

`string`

##### directives

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`void`\>
