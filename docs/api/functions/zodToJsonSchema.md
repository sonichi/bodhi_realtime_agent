[bodhi-realtime-agent](../index.md) / zodToJsonSchema

# Function: zodToJsonSchema()

> **zodToJsonSchema**(`schema`, `format?`): `Record`\<`string`, `unknown`\>

Defined in: [transport/zod-to-schema.ts:32](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/zod-to-schema.ts#L32)

Converts a Zod schema to a simplified JSON Schema.
Handles the common subset: objects with string/number/boolean/array/enum properties.

## Parameters

### schema

`ZodType`

### format?

`SchemaFormat` = `'gemini'`

`'gemini'` (default) outputs UPPERCASE types for Gemini function declarations.
                `'standard'` outputs lowercase types for OpenAI and standard JSON Schema consumers.

## Returns

`Record`\<`string`, `unknown`\>
