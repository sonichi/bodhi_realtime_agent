[bodhi-realtime-agent](../index.md) / InMemorySessionStore

# Class: InMemorySessionStore

Defined in: [core/session-store.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-store.ts#L22)

Map-based in-memory implementation of SessionStore.
Uses structuredClone for deep-copy isolation between save/load calls.

## Implements

- [`SessionStore`](../interfaces/SessionStore.md)

## Constructors

### Constructor

> **new InMemorySessionStore**(): `InMemorySessionStore`

#### Returns

`InMemorySessionStore`

## Methods

### delete()

> **delete**(`sessionId`): `Promise`\<`void`\>

Defined in: [core/session-store.ts:34](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-store.ts#L34)

Delete a session checkpoint.

#### Parameters

##### sessionId

`string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SessionStore`](../interfaces/SessionStore.md).[`delete`](../interfaces/SessionStore.md#delete)

***

### load()

> **load**(`sessionId`): `Promise`\<[`SessionCheckpoint`](../interfaces/SessionCheckpoint.md) \| `null`\>

Defined in: [core/session-store.ts:29](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-store.ts#L29)

Load a session checkpoint by ID (null if not found).

#### Parameters

##### sessionId

`string`

#### Returns

`Promise`\<[`SessionCheckpoint`](../interfaces/SessionCheckpoint.md) \| `null`\>

#### Implementation of

[`SessionStore`](../interfaces/SessionStore.md).[`load`](../interfaces/SessionStore.md#load)

***

### save()

> **save**(`checkpoint`): `Promise`\<`void`\>

Defined in: [core/session-store.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-store.ts#L25)

Persist a session checkpoint (overwrites any existing checkpoint for this session).

#### Parameters

##### checkpoint

[`SessionCheckpoint`](../interfaces/SessionCheckpoint.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SessionStore`](../interfaces/SessionStore.md).[`save`](../interfaces/SessionStore.md#save)
