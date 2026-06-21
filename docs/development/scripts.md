# Scripts & Operations

Run repository operations from the root with Bun.

## Development

```sh
bun run dev       # all apps/packages with dev tasks
bun run dev:all   # alias for all dev tasks
bun run dev:web   # apps/web on 3000
bun run dev:docs  # apps/docs on 3001
bun run dev:user  # apps/user on 3002
bun run dev:admin # apps/admin on 3003
bun run dev:api   # apps/api on 4000
```

All dev scripts load the root `.env` through `bun --env-file=.env` at the root and `bun --env-file=../../.env` inside apps.

## Database

```sh
bun run db:generate
bun run db:migrate
bun run db:push
bun run db:studio
bun run db:drop
bun run db:check
```

These commands delegate to `packages/db` and load the root `.env`.

## Verification

```sh
bun run check-types
bun run test
bun run test:e2e
bun run lint
bun run format
```

## Adding a workspace

1. Add it under `apps/*` or `packages/*`.
2. Add `lint` and `check-types` scripts.
3. Use `@vend1k/eslint-config` and `@vend1k/typescript-config`.
4. Load environment variables from the root `.env`; do not create app-local `.env` files.
