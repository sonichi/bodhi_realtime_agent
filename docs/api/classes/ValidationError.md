[bodhi-realtime-agent](../index.md) / ValidationError

# Class: ValidationError

Defined in: [core/errors.ts:69](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L69)

Error from input validation (Zod schema, config checks).

## Extends

- [`FrameworkError`](FrameworkError.md)

## Constructors

### Constructor

> **new ValidationError**(`message`, `options?`): `ValidationError`

Defined in: [core/errors.ts:70](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/errors.ts#L70)

#### Parameters

##### message

`string`

##### options?

###### cause?

`Error`

###### severity?

[`ErrorSeverity`](../type-aliases/ErrorSeverity.md)

#### Returns

`ValidationError`

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
