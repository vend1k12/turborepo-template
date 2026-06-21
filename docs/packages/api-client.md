# API Client Package (`@vend1k/api-client`)

`packages/api-client` centralizes typed frontend access to the Hono backend.

## Responsibilities

- Create a Hono RPC client with `credentials: "include"`.
- Resolve the API base URL from `NEXT_PUBLIC_API_URL` or `API_URL`.
- Keep frontend apps from scattering raw `fetch` calls.

## Usage

```ts
import { createApiClient } from "@vend1k/api-client";
import type { AppType } from "@vend1k/api";

const api = createApiClient<AppType>();
```

## Environment

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Rule

Feature code should call the API through this package or through feature-level services wrapping this package. Do not hardcode API URLs in components.
