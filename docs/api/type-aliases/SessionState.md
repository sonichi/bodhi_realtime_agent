[bodhi-realtime-agent](../index.md) / SessionState

# Type Alias: SessionState

> **SessionState** = `"CREATED"` \| `"CONNECTING"` \| `"ACTIVE"` \| `"RECONNECTING"` \| `"TRANSFERRING"` \| `"CLOSED"`

Defined in: [types/session.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L17)

Session lifecycle states. Transitions follow a strict state machine:

  CREATED → CONNECTING → ACTIVE → RECONNECTING → ACTIVE
                          ↓                        ↓
                      TRANSFERRING → ACTIVE     CLOSED
                          ↓
                        CLOSED

Any state can transition to CLOSED on fatal error.
