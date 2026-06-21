# @vend1k/admin

Internal admin dashboard for the monorepo. Next.js (App Router) on port `3003`.

## Stack

- Next.js 16 (App Router, Turbopack)
- Auth: [Better Auth](https://www.better-auth.com) via `@vend1k/auth` (served by `apps/api`)
- UI: `@vend1k/ui` (shadcn/ui-based primitives, shared `SharedSidebar`/`PortalShell`)
- Data: `@vend1k/api-client` (typed Hono RPC) → `apps/api`
- Forms: TanStack Form · Tables: TanStack Table · State: Zustand · URL state: nuqs
- Command palette: kbar (⌘K) · Charts: Recharts

## Develop

From the repo root (preferred — loads the shared root `.env`):

```sh
bun run dev:admin
```

Or all apps at once:

```sh
bun run dev
```

The admin app expects `apps/api` (`:4000`) and Postgres to be running for auth and data. See the root `README.md` and `docs/development/` for the full setup (DB, migrations, env).

## Routes

- `/` redirects to `/dashboard/overview`.
- Dashboard shell lives in `src/app/dashboard/layout.tsx` (`SidebarProvider` + `AppSidebar` from `@vend1k/ui` + `Header`).

## Verify

Run from the repo root so Turborepo wires dependencies:

```sh
bun run check-types
bun run lint
```

## Notes

- This app is internal-only; its layout sets `robots: { index: false, follow: false }`.
- Brand strings and cross-app URLs are being centralized; see `docs/` for the template rename guide.
