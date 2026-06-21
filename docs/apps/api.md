# Hono Backend API (`apps/api`)

`apps/api` is the central Hono backend, running on port `4000`.

## Responsibilities

- Mount Better Auth under `/api/auth/*`.
- Expose `/api/health`.
- Expose user profile routes.
- Expose admin users/products routes.
- Expose organization and organization product routes.
- Export `AppType` for typed Hono clients.

## Current route groups

```txt
/api/health
/api/auth/*
/api/user/profile
/api/admin/users
/api/admin/products
/api/organizations
/api/organizations/:orgId/products
```

## Type-safe RPC

`apps/api/src/app.ts` exports `AppType` from the composed Hono app. Frontends create clients through `@vend1k/api-client`.

```ts
import { createApiClient } from "@vend1k/api-client";
import type { AppType } from "@vend1k/api";

const api = createApiClient<AppType>();
```

## Environment

Loaded from the root `.env`:

```env
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vend1k
BETTER_AUTH_SECRET=placeholder-secret-must-be-32-characters-long
BETTER_AUTH_URL=http://localhost:4000
```
