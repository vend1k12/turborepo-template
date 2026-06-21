# Better Auth Configuration

The monorepo uses **Better Auth** as its unified authentication and identity management service. Auth is self-hosted through `apps/api`, with frontend apps using only the browser client from `@vend1k/auth/client`.

## Architectural Layout

Better Auth is structured in a client-server split:

```txt
┌────────────────┐                ┌──────────────┐
│  Client Apps   │                │  Hono Server │
│ (Next.js apps) │                │  (apps/api)  │
└───────┬────────┘                └──────┬───────┘
        │                                │
        │ Fetch Requests                 │ Auth Middleware
        ▼                                ▼
┌────────────────────────┐        ┌──────────────┐
│   @vend1k/auth/client  ├───────>│  Better Auth │
│ (Uses API baseURL)     │        │    Engine    │
└────────────────────────┘        └──────┬───────┘
                                         │ Drizzle adapter
                                         ▼
                                  ┌──────────────┐
                                  │  Postgres DB │
                                  │ (@vend1k/db) │
                                  └──────────────┘
```

## Backend Engine (`packages/auth`)

The server configuration in `packages/auth/src/index.ts` uses the `drizzleAdapter` linked to `@vend1k/db` and exposes the `auth` handler.

Key config settings:

- **Adapter**: PostgreSQL schema tables mapping `user`, `session`, `account`, and `verification`.
- **Base URL**: Set via `BETTER_AUTH_URL` environment variable (defaulting to API server at port `4000`).
- **Providers**: Email and password credentials enabled.

## Frontend Client (`packages/auth/src/client.ts`)

Applications import `authClient` from `@vend1k/auth/client`. The client automatically prefixes session requests with the `NEXT_PUBLIC_BETTER_AUTH_URL` API endpoint.

### Basic Sign In Code Example

```typescript
import { authClient } from "@vend1k/auth/client";

const signInUser = async () => {
  const { data, error } = await authClient.signIn.email({
    email: "user@example.com",
    password: "my-secure-password",
  });

  if (error) {
    console.error("Sign in failed:", error.message);
  } else {
    console.log("Logged in successfully:", data);
  }
};
```

## Client Auth State Hooks

The client library exposes React hooks to easily subscribe to authentication states:

- `useSession()` — Returns the active user's session and details.
- `authClient.signOut()` — Terminating sessions.
