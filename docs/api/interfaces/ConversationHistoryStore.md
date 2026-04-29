[bodhi-realtime-agent](../index.md) / ConversationHistoryStore

# Interface: ConversationHistoryStore

Defined in: [types/history.ts:74](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L74)

Persistence interface for conversation history.
Implementations are responsible for durable storage of session records and conversation items.

## Methods

### addItems()

> **addItems**(`sessionId`, `items`): `Promise`\<`void`\>

Defined in: [types/history.ts:80](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L80)

Append conversation items to a session's history.

#### Parameters

##### sessionId

`string`

##### items

[`ConversationItem`](ConversationItem.md)[]

#### Returns

`Promise`\<`void`\>

***

### createSession()

> **createSession**(`session`): `Promise`\<`void`\>

Defined in: [types/history.ts:76](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L76)

Create a new session record.

#### Parameters

##### session

[`SessionRecord`](SessionRecord.md)

#### Returns

`Promise`\<`void`\>

***

### getSession()

> **getSession**(`sessionId`): `Promise`\<[`SessionRecord`](SessionRecord.md) \| `null`\>

Defined in: [types/history.ts:84](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L84)

Retrieve a session record by ID (null if not found).

#### Parameters

##### sessionId

`string`

#### Returns

`Promise`\<[`SessionRecord`](SessionRecord.md) \| `null`\>

***

### getSessionItems()

> **getSessionItems**(`sessionId`, `options?`): `Promise`\<[`ConversationItem`](ConversationItem.md)[]\>

Defined in: [types/history.ts:86](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L86)

Retrieve conversation items for a session with optional pagination.

#### Parameters

##### sessionId

`string`

##### options?

[`PaginationOptions`](PaginationOptions.md)

#### Returns

`Promise`\<[`ConversationItem`](ConversationItem.md)[]\>

***

### listUserSessions()

> **listUserSessions**(`userId`, `options?`): `Promise`\<[`SessionSummary`](SessionSummary.md)[]\>

Defined in: [types/history.ts:88](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L88)

List all sessions for a user with optional pagination.

#### Parameters

##### userId

`string`

##### options?

[`PaginationOptions`](PaginationOptions.md)

#### Returns

`Promise`\<[`SessionSummary`](SessionSummary.md)[]\>

***

### saveSessionReport()

> **saveSessionReport**(`report`): `Promise`\<`void`\>

Defined in: [types/history.ts:82](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L82)

Save a complete session report (called on session close).

#### Parameters

##### report

[`SessionReport`](SessionReport.md)

#### Returns

`Promise`\<`void`\>

***

### updateSession()

> **updateSession**(`sessionId`, `update`): `Promise`\<`void`\>

Defined in: [types/history.ts:78](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L78)

Update fields on an existing session record.

#### Parameters

##### sessionId

`string`

##### update

`Partial`\<[`SessionRecord`](SessionRecord.md)\>

#### Returns

`Promise`\<`void`\>
