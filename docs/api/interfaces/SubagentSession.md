[bodhi-realtime-agent](../index.md) / SubagentSession

# Interface: SubagentSession

Defined in: [agent/subagent-session.ts:82](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L82)

Public interface for interacting with an interactive subagent session.

## Properties

### state

> `readonly` **state**: [`SubagentSessionState`](../type-aliases/SubagentSessionState.md)

Defined in: [agent/subagent-session.ts:84](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L84)

***

### toolCallId

> `readonly` **toolCallId**: `string`

Defined in: [agent/subagent-session.ts:83](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L83)

## Methods

### cancel()

> **cancel**(): `void`

Defined in: [agent/subagent-session.ts:105](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L105)

#### Returns

`void`

***

### cancellation()

> **cancellation**(): `Promise`\<`never`\>

Defined in: [agent/subagent-session.ts:93](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L93)

#### Returns

`Promise`\<`never`\>

***

### complete()

> **complete**(`result`): `void`

Defined in: [agent/subagent-session.ts:106](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L106)

#### Parameters

##### result

`unknown`

#### Returns

`void`

***

### hasUiRequest()

> **hasUiRequest**(`requestId`): `boolean`

Defined in: [agent/subagent-session.ts:103](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L103)

Check if this session has a pending UI request with the given requestId.

#### Parameters

##### requestId

`string`

#### Returns

`boolean`

***

### nextUserInput()

> **nextUserInput**(): `Promise`\<`string`\>

Defined in: [agent/subagent-session.ts:92](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L92)

#### Returns

`Promise`\<`string`\>

***

### onMessage()

> **onMessage**(`handler`): `void`

Defined in: [agent/subagent-session.ts:95](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L95)

#### Parameters

##### handler

`MessageHandler`

#### Returns

`void`

***

### onStateChange()

> **onStateChange**(`handler`): `void`

Defined in: [agent/subagent-session.ts:96](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L96)

#### Parameters

##### handler

`StateChangeHandler`

#### Returns

`void`

***

### registerUiRequest()

> **registerUiRequest**(`requestId`, `options`): `void`

Defined in: [agent/subagent-session.ts:99](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L99)

Register a UI request for option-based responses (requestId → options mapping).

#### Parameters

##### requestId

`string`

##### options

`SubagentOption`[]

#### Returns

`void`

***

### resolveOption()

> **resolveOption**(`requestId`, `selectedOptionId`): `SubagentOption` \| `undefined`

Defined in: [agent/subagent-session.ts:101](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L101)

Look up an option by requestId and selectedOptionId.

#### Parameters

##### requestId

`string`

##### selectedOptionId

`string`

#### Returns

`SubagentOption` \| `undefined`

***

### sendToSubagent()

> **sendToSubagent**(`input`): `void`

Defined in: [agent/subagent-session.ts:87](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L87)

#### Parameters

##### input

`string`

#### Returns

`void`

***

### sendToUser()

> **sendToUser**(`msg`): `void`

Defined in: [agent/subagent-session.ts:86](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L86)

#### Parameters

##### msg

[`SubagentMessage`](SubagentMessage.md)

#### Returns

`void`

***

### trySendToSubagent()

> **trySendToSubagent**(`input`): `boolean`

Defined in: [agent/subagent-session.ts:89](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L89)

Non-throwing variant: returns false if state is not 'waiting_for_input'.

#### Parameters

##### input

`string`

#### Returns

`boolean`

***

### waitForInput()

> **waitForInput**(`timeoutMs?`): `Promise`\<`string`\>

Defined in: [agent/subagent-session.ts:91](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L91)

#### Parameters

##### timeoutMs?

`number`

#### Returns

`Promise`\<`string`\>
