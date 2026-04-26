[bodhi-realtime-agent](../index.md) / IEventBus

# Interface: IEventBus

Defined in: [core/event-bus.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/event-bus.ts#L12)

Type-safe event bus interface.
All framework components communicate via this bus for loose coupling.

## Methods

### clear()

> **clear**(): `void`

Defined in: [core/event-bus.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/event-bus.ts#L18)

Remove all handlers (used for cleanup in tests and session teardown).

#### Returns

`void`

***

### publish()

> **publish**\<`T`\>(`event`, `payload`): `void`

Defined in: [core/event-bus.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/event-bus.ts#L14)

Synchronously dispatch an event to all registered handlers.

#### Type Parameters

##### T

`T` *extends* keyof [`EventPayloadMap`](EventPayloadMap.md)

#### Parameters

##### event

`T`

##### payload

[`EventPayloadMap`](EventPayloadMap.md)\[`T`\]

#### Returns

`void`

***

### subscribe()

> **subscribe**\<`T`\>(`event`, `handler`): [`Unsubscribe`](../type-aliases/Unsubscribe.md)

Defined in: [core/event-bus.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/event-bus.ts#L16)

Register a handler for an event type. Returns an unsubscribe function.

#### Type Parameters

##### T

`T` *extends* keyof [`EventPayloadMap`](EventPayloadMap.md)

#### Parameters

##### event

`T`

##### handler

[`EventHandler`](../type-aliases/EventHandler.md)\<`T`\>

#### Returns

[`Unsubscribe`](../type-aliases/Unsubscribe.md)
