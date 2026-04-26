[bodhi-realtime-agent](../index.md) / SessionStore

# Interface: SessionStore

Defined in: [core/session-store.ts:9](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-store.ts#L9)

Persistence interface for session checkpoints (crash recovery / session restore).
Implementations should deep-copy on save/load to prevent shared-reference mutations.

## Methods

### delete()

> **delete**(`sessionId`): `Promise`\<`void`\>

Defined in: [core/session-store.ts:15](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-store.ts#L15)

Delete a session checkpoint.

#### Parameters

##### sessionId

`string`

#### Returns

`Promise`\<`void`\>

***

### load()

> **load**(`sessionId`): `Promise`\<[`SessionCheckpoint`](SessionCheckpoint.md) \| `null`\>

Defined in: [core/session-store.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-store.ts#L13)

Load a session checkpoint by ID (null if not found).

#### Parameters

##### sessionId

`string`

#### Returns

`Promise`\<[`SessionCheckpoint`](SessionCheckpoint.md) \| `null`\>

***

### save()

> **save**(`checkpoint`): `Promise`\<`void`\>

Defined in: [core/session-store.ts:11](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-store.ts#L11)

Persist a session checkpoint (overwrites any existing checkpoint for this session).

#### Parameters

##### checkpoint

[`SessionCheckpoint`](SessionCheckpoint.md)

#### Returns

`Promise`\<`void`\>
