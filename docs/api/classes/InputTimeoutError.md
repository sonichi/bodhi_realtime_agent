[bodhi-realtime-agent](../index.md) / InputTimeoutError

# Class: InputTimeoutError

Defined in: [agent/subagent-session.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L20)

Thrown when waitForInput() exceeds its timeout.

## Extends

- [`FrameworkError`](FrameworkError.md)

## Constructors

### Constructor

> **new InputTimeoutError**(`timeoutMs`): `InputTimeoutError`

Defined in: [agent/subagent-session.ts:21](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L21)

#### Parameters

##### timeoutMs

`number`

#### Returns

`InputTimeoutError`

#### Overrides

[`FrameworkError`](FrameworkError.md).[`constructor`](FrameworkError.md#constructor)

## Properties

### cause?

> `readonly` `optional` **cause**: `Error`

Defined in: [core/errors.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L14)

#### Inherited from

[`FrameworkError`](FrameworkError.md).[`cause`](FrameworkError.md#cause)

***

### component

> `readonly` **component**: `string`

Defined in: [core/errors.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L12)

#### Inherited from

[`FrameworkError`](FrameworkError.md).[`component`](FrameworkError.md#component)

***

### severity

> `readonly` **severity**: [`ErrorSeverity`](../type-aliases/ErrorSeverity.md)

Defined in: [core/errors.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L13)

#### Inherited from

[`FrameworkError`](FrameworkError.md).[`severity`](FrameworkError.md#severity)
