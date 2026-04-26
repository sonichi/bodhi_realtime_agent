[bodhi-realtime-agent](../index.md) / FrameworkError

# Class: FrameworkError

Defined in: [core/errors.ts:11](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L11)

Base error class for all framework errors.
Carries a `component` tag and `severity` level for structured error handling.
Supports cause chaining via the standard `cause` property.

## Extends

- `Error`

## Extended by

- [`CancelledError`](CancelledError.md)
- [`InputTimeoutError`](InputTimeoutError.md)
- [`SessionCompletedError`](SessionCompletedError.md)
- [`AgentError`](AgentError.md)
- [`MemoryError`](MemoryError.md)
- [`SessionError`](SessionError.md)
- [`ToolExecutionError`](ToolExecutionError.md)
- [`TransportError`](TransportError.md)
- [`ValidationError`](ValidationError.md)

## Constructors

### Constructor

> **new FrameworkError**(`message`, `options`): `FrameworkError`

Defined in: [core/errors.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L16)

#### Parameters

##### message

`string`

##### options

###### cause?

`Error`

###### component

`string`

###### severity?

[`ErrorSeverity`](../type-aliases/ErrorSeverity.md)

#### Returns

`FrameworkError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `readonly` `optional` **cause**: `Error`

Defined in: [core/errors.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L14)

#### Overrides

`Error.cause`

***

### component

> `readonly` **component**: `string`

Defined in: [core/errors.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L12)

***

### severity

> `readonly` **severity**: [`ErrorSeverity`](../type-aliases/ErrorSeverity.md)

Defined in: [core/errors.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L13)
