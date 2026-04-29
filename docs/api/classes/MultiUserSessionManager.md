[bodhi-realtime-agent](../index.md) / MultiUserSessionManager

# Class: MultiUserSessionManager

Defined in: [core/multi-user-session-manager.ts:35](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L35)

Manages a pool of VoiceSession instances for multiple concurrent users.

## Constructors

### Constructor

> **new MultiUserSessionManager**(`config?`): `MultiUserSessionManager`

Defined in: [core/multi-user-session-manager.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L41)

#### Parameters

##### config?

[`MultiUserSessionManagerConfig`](../interfaces/MultiUserSessionManagerConfig.md) = `{}`

#### Returns

`MultiUserSessionManager`

## Methods

### cleanupIdleSessions()

> **cleanupIdleSessions**(): `Promise`\<`number`\>

Defined in: [core/multi-user-session-manager.ts:205](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L205)

Cleanup idle sessions.

#### Returns

`Promise`\<`number`\>

***

### closeAllSessionsForUser()

> **closeAllSessionsForUser**(`userId`, `reason?`): `Promise`\<`void`\>

Defined in: [core/multi-user-session-manager.ts:158](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L158)

Close all sessions for a user.

#### Parameters

##### userId

`string`

##### reason?

`string` = `'user_logout'`

#### Returns

`Promise`\<`void`\>

***

### closeSession()

> **closeSession**(`sessionId`, `reason?`): `Promise`\<`void`\>

Defined in: [core/multi-user-session-manager.ts:141](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L141)

Close and remove a session.

#### Parameters

##### sessionId

`string`

##### reason?

`string` = `'user_disconnect'`

#### Returns

`Promise`\<`void`\>

***

### createSession()

> **createSession**(`userId`, `sessionConfig`, `webSocketId?`): `Promise`\<[`VoiceSession`](VoiceSession.md)\>

Defined in: [core/multi-user-session-manager.ts:56](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L56)

Create a new VoiceSession for a user.

#### Parameters

##### userId

`string`

##### sessionConfig

`Omit`\<[`VoiceSessionConfig`](../interfaces/VoiceSessionConfig.md), `"sessionId"` \| `"userId"`\>

##### webSocketId?

`string`

#### Returns

`Promise`\<[`VoiceSession`](VoiceSession.md)\>

***

### getAllSessionMetadata()

> **getAllSessionMetadata**(): [`SessionMetadata`](../interfaces/SessionMetadata.md)[]

Defined in: [core/multi-user-session-manager.ts:198](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L198)

Get all session metadata for API.

#### Returns

[`SessionMetadata`](../interfaces/SessionMetadata.md)[]

***

### getAllSessionsForUser()

> **getAllSessionsForUser**(`userId`): [`VoiceSession`](VoiceSession.md)[]

Defined in: [core/multi-user-session-manager.ts:115](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L115)

Get all active sessions for a user.

#### Parameters

##### userId

`string`

#### Returns

[`VoiceSession`](VoiceSession.md)[]

***

### getSession()

> **getSession**(`sessionId`): [`VoiceSession`](VoiceSession.md) \| `null`

Defined in: [core/multi-user-session-manager.ts:101](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L101)

Get a session by ID.

#### Parameters

##### sessionId

`string`

#### Returns

[`VoiceSession`](VoiceSession.md) \| `null`

***

### getSessionMetadata()

> **getSessionMetadata**(`sessionId`): [`SessionMetadata`](../interfaces/SessionMetadata.md) \| `null`

Defined in: [core/multi-user-session-manager.ts:108](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L108)

Get session metadata.

#### Parameters

##### sessionId

`string`

#### Returns

[`SessionMetadata`](../interfaces/SessionMetadata.md) \| `null`

***

### getStats()

> **getStats**(): `object`

Defined in: [core/multi-user-session-manager.ts:166](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L166)

Get statistics about active sessions.

#### Returns

`object`

##### newestSession

> **newestSession**: `number` \| `null`

##### oldestSession

> **oldestSession**: `number` \| `null`

##### sessionsByUser

> **sessionsByUser**: `Record`\<`string`, `number`\>

##### totalSessions

> **totalSessions**: `number`

***

### shutdown()

> **shutdown**(): `Promise`\<`void`\>

Defined in: [core/multi-user-session-manager.ts:247](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L247)

Stop the cleanup timer and close all sessions.

#### Returns

`Promise`\<`void`\>

***

### updateActivity()

> **updateActivity**(`sessionId`): `void`

Defined in: [core/multi-user-session-manager.ts:131](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/multi-user-session-manager.ts#L131)

Update last activity time for a session.

#### Parameters

##### sessionId

`string`

#### Returns

`void`
