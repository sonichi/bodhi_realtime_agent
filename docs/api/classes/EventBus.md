[bodhi-realtime-agent](../index.md) / EventBus

# Class: EventBus

Defined in: [core/event-bus.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/event-bus.ts#L25)

In-memory, synchronous event bus.
Handler exceptions are caught and logged — they never propagate to the publisher.

## Implements

- [`IEventBus`](../interfaces/IEventBus.md)

## Constructors

### Constructor

> **new EventBus**(): `EventBus`

#### Returns

`EventBus`

## Methods

### clear()

> **clear**(): `void`

Defined in: [core/event-bus.ts:58](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/event-bus.ts#L58)

Remove all handlers (used for cleanup in tests and session teardown).

#### Returns

`void`

#### Implementation of

[`IEventBus`](../interfaces/IEventBus.md).[`clear`](../interfaces/IEventBus.md#clear)

***

### publish()

> **publish**\<`T`\>(`event`, `payload`): `void`

Defined in: [core/event-bus.ts:28](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/event-bus.ts#L28)

Synchronously dispatch an event to all registered handlers.

#### Type Parameters

##### T

`T` *extends* keyof [`EventPayloadMap`](../interfaces/EventPayloadMap.md)

#### Parameters

##### event

`T`

##### payload

[`EventPayloadMap`](../interfaces/EventPayloadMap.md)\[`T`\]

#### Returns

`void`

#### Implementation of

[`IEventBus`](../interfaces/IEventBus.md).[`publish`](../interfaces/IEventBus.md#publish)

***

### subscribe()

> **subscribe**\<`T`\>(`event`, `handler`): [`Unsubscribe`](../type-aliases/Unsubscribe.md)

Defined in: [core/event-bus.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/event-bus.ts#L41)

Register a handler for an event type. Returns an unsubscribe function.

#### Type Parameters

##### T

`T` *extends* keyof [`EventPayloadMap`](../interfaces/EventPayloadMap.md)

#### Parameters

##### event

`T`

##### handler

[`EventHandler`](../type-aliases/EventHandler.md)\<`T`\>

#### Returns

[`Unsubscribe`](../type-aliases/Unsubscribe.md)

#### Implementation of

[`IEventBus`](../interfaces/IEventBus.md).[`subscribe`](../interfaces/IEventBus.md#subscribe)
