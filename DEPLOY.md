# Deploying for free (Vercel + Neon)

This template deploys to **$0/month** using Vercel (frontends + API as serverless
functions) and Neon (serverless Postgres free tier), with a **preview deploy on
every pull request**.

The code in this repo is already prepared for this. What's left is creating the
accounts/projects and pasting a few config files — that's what this guide covers.

## Architecture

Five apps deploy as **five separate Vercel projects** from this one monorepo:

| App         | Vercel root directory | Type                          |
| ----------- | --------------------- | ----------------------------- |
| `apps/web`   | `apps/web`            | Next.js (landing)             |
| `apps/docs`  | `apps/docs`           | Next.js (Fumadocs)            |
| `apps/user`  | `apps/user`           | Next.js (dashboard)           |
| `apps/admin` | `apps/admin`          | Next.js (dashboard)           |
| `apps/api`   | `apps/api`            | Hono on Vercel Functions      |

The API is a separate service. Frontends talk to it via `NEXT_PUBLIC_API_URL`
and send the Better Auth session cookie cross-site. Because api and the
frontends live on different `*.vercel.app` hosts, the cookie is configured
(in production) as `sameSite=none; secure; partitioned`. CORS and Better Auth
`trustedOrigins` both allow `*.vercel.app`, so **preview URLs work with no
per-PR configuration**.

---

## 1. Database — Neon (free)

1. Create a project at https://neon.tech (free tier).
2. Copy the **pooled** connection string (the host contains `-pooler`). It looks
   like `postgres://user:pass@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require`.
3. Run migrations against Neon from your machine once:
   ```sh
   DATABASE_URL="<neon-pooled-url>" bun run db:migrate
   ```
   The `packages/db` driver auto-selects the Neon serverless driver for any
   `*.neon.tech` URL (override with `DB_DRIVER=neon|pg`).

> Note: Neon free tier scales compute to zero when idle, so the first request
> after a quiet period has a cold start (~1s). Fine for a portfolio demo.

---

## 2. API project — add the Vercel Node entrypoint

Vercel discovers serverless functions in an `api/` directory. Create
**`apps/api/api/index.ts`**:

```ts
import { handle } from "hono/vercel";
import { app } from "../src/app";

export const config = { runtime: "nodejs" };

export default handle(app);
```

> The repo keeps `apps/api/src/index.ts` (the Bun entrypoint) for local
> `bun run dev`. This new file is the Node/Vercel entrypoint and is additive —
> it does not affect local development.

Create **`apps/api/vercel.json`** so every path routes into the function:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [{ "source": "/(.*)", "destination": "/api/index" }]
}
```

---

## 3. Create the five Vercel projects

For each app: **New Project → import this repo → set Root Directory** to the
path from the table above. Vercel detects Next.js automatically for the four
frontends. For `apps/api`, framework = "Other".

Build settings (all projects): Vercel runs the build from the repo root with
the app's root directory, so the default `bun install` + per-app build works
with the existing Turborepo setup. If a project's build doesn't pick up
workspace packages, set the **Install Command** to `bun install` at the repo
root and leave Build Command as the framework default.

---

## 4. Environment variables (per project)

Set these in each Vercel project's **Settings → Environment Variables**.
`NODE_ENV=production` is provided by Vercel automatically.

### `apps/api`

```
DATABASE_URL          = <neon pooled url>
BETTER_AUTH_SECRET    = <32+ char random secret>   # openssl rand -base64 32
BETTER_AUTH_URL       = https://<api>.vercel.app
NEXT_PUBLIC_USER_URL  = https://<user>.vercel.app
NEXT_PUBLIC_ADMIN_URL = https://<admin>.vercel.app
```

### `apps/user`, `apps/admin`

```
NEXT_PUBLIC_API_URL          = https://<api>.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL  = https://<api>.vercel.app
NEXT_PUBLIC_USER_URL         = https://<user>.vercel.app
NEXT_PUBLIC_ADMIN_URL        = https://<admin>.vercel.app
NEXT_PUBLIC_DOCS_URL         = https://<docs>.vercel.app
```

### `apps/web`, `apps/docs`

```
NEXT_PUBLIC_DOCS_URL  = https://<docs>.vercel.app
NEXT_PUBLIC_USER_URL  = https://<user>.vercel.app
NEXT_PUBLIC_ADMIN_URL = https://<admin>.vercel.app
NEXT_PUBLIC_API_URL   = https://<api>.vercel.app   # web only, if it calls the API
```

> You can't know the final `*.vercel.app` URLs until the projects exist. Create
> all five first, note their production URLs, then fill these in and redeploy.

---

## 5. Preview deploys

Vercel's Git integration creates a preview deployment for every pull request
automatically — no GitHub Action needed. Each preview gets a fresh hostname like
`user-git-<branch>-<scope>.vercel.app`.

These work without extra config because:

- **CORS** (`apps/api/src/app.ts`) allows any `*.vercel.app` via
  `isAllowedOrigin` from `@vend1k/shared`.
- **Better Auth** (`packages/auth/src/index.ts`) trusts `https://*.vercel.app`
  via `trustedOrigins`.
- The cross-site cookie is `sameSite=none; secure; partitioned` in production.

One caveat: a preview frontend points at the **production** API
(`NEXT_PUBLIC_API_URL`), since that env var is fixed per project. Auth and data
on previews therefore use prod data. For a portfolio demo this is usually fine;
if you need isolated preview backends, give the API project a preview-scoped
`NEXT_PUBLIC_API_URL` and point frontends at the API's preview URL (more setup).

---

## 6. Verify

1. Open the `web` and `docs` production URLs — static content renders.
2. Open `user`, sign up / sign in — the session cookie is set and `user/profile`
   loads (confirms cross-site cookie + CORS).
3. Open `admin`, sign in with an admin account — `admin/users` loads.
4. Open a PR — confirm Vercel posts preview URLs and they work end to end.

---

## Limits to know (free tiers)

- **Neon**: compute sleeps when idle (cold start), ~0.5 GB storage.
- **Vercel Hobby**: non-commercial use, function execution and bandwidth caps —
  generous for a portfolio/demo. Don't put a real paying product on Hobby.
