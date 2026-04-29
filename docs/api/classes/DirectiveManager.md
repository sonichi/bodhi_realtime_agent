[bodhi-realtime-agent](../index.md) / DirectiveManager

# Class: DirectiveManager

Defined in: [core/directive-manager.ts:10](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/directive-manager.ts#L10)

Manages session-scoped and agent-scoped directives.

Extracted from VoiceSession to isolate the directive management concern.
Session directives persist across agent transfers; agent directives are
cleared on each transfer.

## Constructors

### Constructor

> **new DirectiveManager**(): `DirectiveManager`

#### Returns

`DirectiveManager`

## Methods

### clearAgent()

> **clearAgent**(): `void`

Defined in: [core/directive-manager.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/directive-manager.ts#L22)

Clear agent-scoped directives (called on agent transfer).

#### Returns

`void`

***

### getReinforcementText()

> **getReinforcementText**(): `string`

Defined in: [core/directive-manager.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/directive-manager.ts#L38)

Merge both directive maps and return formatted reinforcement text.
Agent directives override session directives with the same key.
Returns empty string if no directives are set.

#### Returns

`string`

***

### getSessionSuffix()

> **getSessionSuffix**(): `string`

Defined in: [core/directive-manager.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/directive-manager.ts#L27)

Returns session-scoped directives formatted as a system instruction suffix.

#### Returns

`string`

***

### set()

> **set**(`key`, `value`, `scope?`): `void`

Defined in: [core/directive-manager.ts:15](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/directive-manager.ts#L15)

Set or delete a directive. Defaults to agent scope if not specified.

#### Parameters

##### key

`string`

##### value

`string` | `null`

##### scope?

`"session"` | `"agent"`

#### Returns

`void`
