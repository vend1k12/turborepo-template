<div align="center">

# turborepo-template

**A production-shaped Turborepo starter — five apps, shared typed packages, and a $0/month deploy story.**

Landing page · docs · user dashboard · admin dashboard · type-safe API — all in one monorepo,
deployable to Vercel + Neon for free with a preview environment on every pull request.

[![CI](https://github.com/vend1k12/turborepo-template/actions/workflows/ci.yml/badge.svg)](https://github.com/vend1k12/turborepo-template/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.x-EF4444?logo=turborepo&logoColor=white)](https://turbo.build/repo)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![Hono](https://img.shields.io/badge/Hono-4-E36002?logo=hono&logoColor=white)](https://hono.dev)
[![Bun](https://img.shields.io/badge/Bun-1.3-000?logo=bun&logoColor=white)](https://bun.sh)

[Quick start](#quick-start) · [Architecture](#architecture) · [Deploy for free](#deploy-for-free) · [Tech stack](#tech-stack)

</div>

---

## Why this template

Most starters give you a single app. Real products are a *fleet*: a marketing site, docs,
a customer dashboard, an internal admin tool, and an API behind them. This template wires all
of that together with **end-to-end type safety** (the API's route types flow into the frontends
via Hono RPC) and a deploy path that costs **nothing** to run as a portfolio or demo.

- **One repo, five deployables** — each app ships independently to its own Vercel project.
- **Type-safe across the wire** — change an API route, the frontend's client types update.
- **Auth that works cross-origin** — Better Auth sessions across separate domains, including
  Vercel preview URLs, with zero per-PR configuration.
- **Free-tier ready** — serverless Postgres (Neon) + serverless functions (Vercel), with the
  database driver auto-switching between serverless and local Postgres.
- **Also runs on a VPS** — Docker Compose with Caddy (or Traefik) if you'd rather self-host.

## Apps

| App          | Port   | Description                                   |
| ------------ | ------ | --------------------------------------------- |
| `apps/web`   | `3000` | Public landing page                           |
| `apps/docs`  | `3001` | Documentation (Fumadocs)                      |
| `apps/user`  | `3002` | Customer dashboard (sign-in, organizations)   |
| `apps/admin` | `3003` | Internal admin dashboard                      |
| `apps/api`   | `4000` | Hono API + Better Auth backend                |

## Packages

| Package                   | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `@vend1k/ui`              | Shared UI primitives and app patterns              |
| `@vend1k/shared`          | Browser-safe roles, permissions, schemas, origins  |
| `@vend1k/db`              | Postgres + Drizzle schema and client               |
| `@vend1k/auth`            | Better Auth server/client split                    |
| `@vend1k/api-client`      | Type-safe Hono RPC client + React Query hooks      |
| `@vend1k/eslint-config`   | Shared ESLint config                               |
| `@vend1k/typescript-config` | Shared TypeScript config                         |

## Architecture

```
                       ┌───────────────────────────────────────┐
   Browsers            │              Vercel (free)            │
      │                │                                       │
      ▼                │  web   docs   user   admin            │
 ┌─────────┐  HTTPS    │   │     │      │       │               │
 │ visitor │──────────▶│   └─────┴──────┴───────┘               │
 └─────────┘           │            │  fetch + cookie           │
                       │            ▼                           │
                       │      apps/api (Hono on Functions)      │
                       │            │                           │
                       └────────────┼───────────────────────────┘
                                    │ Drizzle (Neon driver)
                                    ▼
                          ┌───────────────────┐
                          │  Neon Postgres     │
                          │  (serverless, free)│
                          └───────────────────┘
```

- Frontends call the API via `NEXT_PUBLIC_API_URL` and send the Better Auth session cookie.
- Because the apps and API live on **different** `*.vercel.app` hosts, the session cookie is
  `sameSite=none; secure; partitioned` in production. CORS and Better Auth `trustedOrigins`
  both allow `*.vercel.app`, so **preview deploys authenticate with no extra setup**.
- `@vend1k/db` picks the Neon serverless driver for `*.neon.tech` URLs and `node-postgres`
  otherwise — the same code runs on Vercel Functions and against local Docker Postgres.

## Quick start

Requires [Bun](https://bun.sh) and a Postgres database (local Docker or Neon).

```sh
bun install
cp .env.example .env        # then edit DATABASE_URL etc.
bun run db:migrate          # apply the schema
bun run dev                 # start all apps
```

| Service | URL                     |
| ------- | ----------------------- |
| web     | http://localhost:3000   |
| docs    | http://localhost:3001   |
| user    | http://localhost:3002   |
| admin   | http://localhost:3003   |
| api     | http://localhost:4000   |

Need a local Postgres? `docker compose up db -d` starts one matching the default `.env`.

## Verification

```sh
bun run check-types
bun run test
bun run test:e2e   # expects the apps to be running
```

`test:e2e` supports `BASE_WEB_URL`, `BASE_DOCS_URL`, `BASE_USER_URL`, `BASE_ADMIN_URL`,
and `BASE_API_URL` overrides.

## Deploy for free

Full step-by-step guide in **[DEPLOY.md](./DEPLOY.md)**. In short:

1. Create a free **Neon** Postgres project, grab the pooled connection string.
2. `DATABASE_URL=<neon-url> bun run db:migrate`.
3. Create **five Vercel projects** from this repo (one per app, set the root directory).
4. Set per-project environment variables (tables in the guide).
5. Open a PR → Vercel posts working preview URLs automatically.

> Free-tier notes: Neon compute sleeps when idle (cold start ~1s); Vercel Hobby is
> non-commercial. Both are fine for a portfolio or demo.

## Self-host on a VPS

```sh
docker compose up --build                                   # Caddy reverse proxy
docker compose -f compose.yaml -f compose.traefik.yaml up   # Traefik profile
```

## Auth

Better Auth is served by `apps/api`; frontends import only `@vend1k/auth/client`. The initial
scope is email/password, optional organizations for `apps/user`, and roles `owner`, `admin`,
`member`, `viewer`.

## Tech stack

**Monorepo:** Turborepo · Bun workspaces
**Frontend:** Next.js (App Router) · React · TanStack Query · Tailwind
**Backend:** Hono · Better Auth · Drizzle ORM
**Database:** Postgres (Neon serverless / local Docker)
**Tooling:** TypeScript · ESLint · Prettier · Vitest · Playwright

## License

[MIT](./LICENSE) © vend1k
