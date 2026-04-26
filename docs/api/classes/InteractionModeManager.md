[bodhi-realtime-agent](../index.md) / InteractionModeManager

# Class: InteractionModeManager

Defined in: [core/interaction-mode.ts:30](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/interaction-mode.ts#L30)

Manages the FIFO queue for interactive subagent sessions.

- `activate()` — makes this subagent the interaction target (or queues it).
- `deactivate()` — clears the active interaction and promotes the next queued entry.
- `getMode()` — returns the current `SessionInteractionMode`.

## Constructors

### Constructor

> **new InteractionModeManager**(): `InteractionModeManager`

#### Returns

`InteractionModeManager`

## Accessors

### queueLength

#### Get Signature

> **get** **queueLength**(): `number`

Defined in: [core/interaction-mode.ts:90](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/interaction-mode.ts#L90)

Number of subagents waiting in the queue (excluding the active one).

##### Returns

`number`

## Methods

### activate()

> **activate**(`toolCallId`, `prompt?`): `Promise`\<`void`\>

Defined in: [core/interaction-mode.ts:56](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/interaction-mode.ts#L56)

Request interaction ownership for the given subagent.

- If no subagent is currently active, activates immediately (returned Promise resolves).
- If another subagent is active, enqueues this one (FIFO). The returned Promise
  resolves when this subagent is promoted to the active interaction target.

#### Parameters

##### toolCallId

`string`

##### prompt?

`string`

#### Returns

`Promise`\<`void`\>

***

### deactivate()

> **deactivate**(`toolCallId`): `void`

Defined in: [core/interaction-mode.ts:75](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/interaction-mode.ts#L75)

Release interaction ownership for the given subagent.

If this subagent is the active one, promotes the next queued entry (if any)
or reverts to `main_agent` mode. If the subagent is queued (not active),
removes it from the queue.

#### Parameters

##### toolCallId

`string`

#### Returns

`void`

***

### getActiveToolCallId()

> **getActiveToolCallId**(): `string` \| `null`

Defined in: [core/interaction-mode.ts:45](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/interaction-mode.ts#L45)

Returns the active subagent's toolCallId, or null if in main_agent mode.

#### Returns

`string` \| `null`

***

### getMode()

> **getMode**(): [`SessionInteractionMode`](../type-aliases/SessionInteractionMode.md)

Defined in: [core/interaction-mode.ts:35](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/interaction-mode.ts#L35)

Returns the current interaction mode.

#### Returns

[`SessionInteractionMode`](../type-aliases/SessionInteractionMode.md)

***

### isSubagentActive()

> **isSubagentActive**(): `boolean`

Defined in: [core/interaction-mode.ts:40](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/interaction-mode.ts#L40)

Shorthand: true when a subagent owns user transcript.

#### Returns

`boolean`
