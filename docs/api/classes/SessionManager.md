[bodhi-realtime-agent](../index.md) / SessionManager

# Class: SessionManager

Defined in: [core/session-manager.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L24)

Manages the session state machine and resumption handle.
Publishes state-change events to the EventBus and fires lifecycle hooks.
Also buffers client messages during disconnected states (RECONNECTING/TRANSFERRING).

## Constructors

### Constructor

> **new SessionManager**(`config`, `eventBus`, `hooks`): `SessionManager`

Defined in: [core/session-manager.ts:34](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L34)

#### Parameters

##### config

[`SessionConfig`](../interfaces/SessionConfig.md)

##### eventBus

[`IEventBus`](../interfaces/IEventBus.md)

##### hooks

[`HooksManager`](HooksManager.md)

#### Returns

`SessionManager`

## Properties

### initialAgent

> `readonly` **initialAgent**: `string`

Defined in: [core/session-manager.ts:32](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L32)

***

### sessionId

> `readonly` **sessionId**: `string`

Defined in: [core/session-manager.ts:30](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L30)

***

### userId

> `readonly` **userId**: `string`

Defined in: [core/session-manager.ts:31](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L31)

## Accessors

### isActive

#### Get Signature

> **get** **isActive**(): `boolean`

Defined in: [core/session-manager.ts:48](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L48)

##### Returns

`boolean`

***

### isDisconnected

#### Get Signature

> **get** **isDisconnected**(): `boolean`

Defined in: [core/session-manager.ts:52](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L52)

##### Returns

`boolean`

***

### resumptionHandle

#### Get Signature

> **get** **resumptionHandle**(): `string` \| `null`

Defined in: [core/session-manager.ts:56](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L56)

##### Returns

`string` \| `null`

***

### state

#### Get Signature

> **get** **state**(): [`SessionState`](../type-aliases/SessionState.md)

Defined in: [core/session-manager.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L44)

##### Returns

[`SessionState`](../type-aliases/SessionState.md)

## Methods

### bufferMessage()

> **bufferMessage**(`message`): `void`

Defined in: [core/session-manager.ts:117](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L117)

#### Parameters

##### message

[`ClientMessage`](../interfaces/ClientMessage.md)

#### Returns

`void`

***

### drainBufferedMessages()

> **drainBufferedMessages**(): [`ClientMessage`](../interfaces/ClientMessage.md)[]

Defined in: [core/session-manager.ts:121](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L121)

#### Returns

[`ClientMessage`](../interfaces/ClientMessage.md)[]

***

### transitionTo()

> **transitionTo**(`newState`): `void`

Defined in: [core/session-manager.ts:60](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L60)

#### Parameters

##### newState

[`SessionState`](../type-aliases/SessionState.md)

#### Returns

`void`

***

### updateResumptionHandle()

> **updateResumptionHandle**(`handle`): `void`

Defined in: [core/session-manager.ts:109](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/session-manager.ts#L109)

#### Parameters

##### handle

`string`

#### Returns

`void`
