[bodhi-realtime-agent](../index.md) / SubagentSessionImpl

# Class: SubagentSessionImpl

Defined in: [agent/subagent-session.ts:118](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L118)

Public interface for interacting with an interactive subagent session.

## Implements

- [`SubagentSession`](../interfaces/SubagentSession.md)

## Constructors

### Constructor

> **new SubagentSessionImpl**(`toolCallId`, `config?`): `SubagentSessionImpl`

Defined in: [agent/subagent-session.ts:135](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L135)

#### Parameters

##### toolCallId

`string`

##### config?

[`InteractiveSubagentConfig`](../interfaces/InteractiveSubagentConfig.md)

#### Returns

`SubagentSessionImpl`

## Properties

### toolCallId

> `readonly` **toolCallId**: `string`

Defined in: [agent/subagent-session.ts:119](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L119)

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`toolCallId`](../interfaces/SubagentSession.md#toolcallid)

## Accessors

### state

#### Get Signature

> **get** **state**(): [`SubagentSessionState`](../type-aliases/SubagentSessionState.md)

Defined in: [agent/subagent-session.ts:140](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L140)

##### Returns

[`SubagentSessionState`](../type-aliases/SubagentSessionState.md)

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`state`](../interfaces/SubagentSession.md#state)

## Methods

### cancel()

> **cancel**(): `void`

Defined in: [agent/subagent-session.ts:279](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L279)

#### Returns

`void`

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`cancel`](../interfaces/SubagentSession.md#cancel)

***

### cancellation()

> **cancellation**(): `Promise`\<`never`\>

Defined in: [agent/subagent-session.ts:254](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L254)

#### Returns

`Promise`\<`never`\>

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`cancellation`](../interfaces/SubagentSession.md#cancellation)

***

### complete()

> **complete**(`_result`): `void`

Defined in: [agent/subagent-session.ts:287](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L287)

#### Parameters

##### \_result

`unknown`

#### Returns

`void`

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`complete`](../interfaces/SubagentSession.md#complete)

***

### hasUiRequest()

> **hasUiRequest**(`requestId`): `boolean`

Defined in: [agent/subagent-session.ts:198](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L198)

Check if this session has a pending UI request with the given requestId.

#### Parameters

##### requestId

`string`

#### Returns

`boolean`

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`hasUiRequest`](../interfaces/SubagentSession.md#hasuirequest)

***

### nextUserInput()

> **nextUserInput**(): `Promise`\<`string`\>

Defined in: [agent/subagent-session.ts:236](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L236)

#### Returns

`Promise`\<`string`\>

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`nextUserInput`](../interfaces/SubagentSession.md#nextuserinput)

***

### onMessage()

> **onMessage**(`handler`): `void`

Defined in: [agent/subagent-session.ts:269](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L269)

#### Parameters

##### handler

`MessageHandler`

#### Returns

`void`

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`onMessage`](../interfaces/SubagentSession.md#onmessage)

***

### onStateChange()

> **onStateChange**(`handler`): `void`

Defined in: [agent/subagent-session.ts:273](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L273)

#### Parameters

##### handler

`StateChangeHandler`

#### Returns

`void`

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`onStateChange`](../interfaces/SubagentSession.md#onstatechange)

***

### registerUiRequest()

> **registerUiRequest**(`requestId`, `options`): `void`

Defined in: [agent/subagent-session.ts:188](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L188)

Register a UI request for option-based responses (requestId → options mapping).

#### Parameters

##### requestId

`string`

##### options

`SubagentOption`[]

#### Returns

`void`

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`registerUiRequest`](../interfaces/SubagentSession.md#registeruirequest)

***

### resolveOption()

> **resolveOption**(`requestId`, `selectedOptionId`): `SubagentOption` \| `undefined`

Defined in: [agent/subagent-session.ts:192](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L192)

Look up an option by requestId and selectedOptionId.

#### Parameters

##### requestId

`string`

##### selectedOptionId

`string`

#### Returns

`SubagentOption` \| `undefined`

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`resolveOption`](../interfaces/SubagentSession.md#resolveoption)

***

### sendToSubagent()

> **sendToSubagent**(`input`): `void`

Defined in: [agent/subagent-session.ts:163](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L163)

#### Parameters

##### input

`string`

#### Returns

`void`

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`sendToSubagent`](../interfaces/SubagentSession.md#sendtosubagent)

***

### sendToUser()

> **sendToUser**(`msg`): `void`

Defined in: [agent/subagent-session.ts:146](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L146)

#### Parameters

##### msg

[`SubagentMessage`](../interfaces/SubagentMessage.md)

#### Returns

`void`

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`sendToUser`](../interfaces/SubagentSession.md#sendtouser)

***

### trySendToSubagent()

> **trySendToSubagent**(`input`): `boolean`

Defined in: [agent/subagent-session.ts:180](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L180)

Non-throwing variant: returns false if state is not 'waiting_for_input'.

#### Parameters

##### input

`string`

#### Returns

`boolean`

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`trySendToSubagent`](../interfaces/SubagentSession.md#trysendtosubagent)

***

### waitForInput()

> **waitForInput**(`timeoutMs?`): `Promise`\<`string`\>

Defined in: [agent/subagent-session.ts:204](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L204)

#### Parameters

##### timeoutMs?

`number`

#### Returns

`Promise`\<`string`\>

#### Implementation of

[`SubagentSession`](../interfaces/SubagentSession.md).[`waitForInput`](../interfaces/SubagentSession.md#waitforinput)
