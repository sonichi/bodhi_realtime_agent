[bodhi-realtime-agent](../index.md) / SessionCompletedError

# Class: SessionCompletedError

Defined in: [agent/subagent-session.ts:31](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L31)

Thrown when the session completes while a waitForInput()/nextUserInput() is pending.

## Extends

- [`FrameworkError`](FrameworkError.md)

## Constructors

### Constructor

> **new SessionCompletedError**(): `SessionCompletedError`

Defined in: [agent/subagent-session.ts:32](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L32)

#### Returns

`SessionCompletedError`

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
