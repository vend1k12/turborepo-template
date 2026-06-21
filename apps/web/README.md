# @vend1k/web

Public landing page for the monorepo. Next.js (App Router) on port `3000`.

## Stack

- Next.js 16 (App Router, Turbopack)
- UI: `@vend1k/ui` design tokens (shared `theme.css`)

## Develop

From the repo root (loads the shared root `.env`):

```sh
bun run dev:web
```

Or all apps at once:

```sh
bun run dev
```

## Configuration

The landing page links to the other apps via env vars (with localhost fallbacks):

```txt
NEXT_PUBLIC_DOCS_URL    (default http://localhost:3001)
NEXT_PUBLIC_USER_URL    (default http://localhost:3002)
NEXT_PUBLIC_ADMIN_URL   (default http://localhost:3003)
```

Set these in the root `.env` for deployed environments. See `.env.example`.

## Verify

```sh
bun run check-types
bun run lint
```
