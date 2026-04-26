[bodhi-realtime-agent](../index.md) / SessionError

# Class: SessionError

Defined in: [core/errors.ts:37](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L37)

Error related to session state machine transitions or lifecycle.

## Extends

- [`FrameworkError`](FrameworkError.md)

## Constructors

### Constructor

> **new SessionError**(`message`, `options?`): `SessionError`

Defined in: [core/errors.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L38)

#### Parameters

##### message

`string`

##### options?

###### cause?

`Error`

###### severity?

[`ErrorSeverity`](../type-aliases/ErrorSeverity.md)

#### Returns

`SessionError`

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
