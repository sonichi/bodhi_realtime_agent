[bodhi-realtime-agent](../index.md) / TransportAuth

# Type Alias: TransportAuth

> **TransportAuth** = \{ `apiKey`: `string`; `type`: `"api_key"`; \} \| \{ `location?`: `string`; `projectId`: `string`; `type`: `"service_account"`; \} \| \{ `getToken`: () => `Promise`\<`string`\>; `type`: `"token_provider"`; \}

Defined in: [types/transport.ts:130](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L130)

Authentication method for the transport.
