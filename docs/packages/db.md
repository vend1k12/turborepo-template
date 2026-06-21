# Database Package (`@vend1k/db`)

`packages/db` owns the PostgreSQL schema, Drizzle client, migrations, and Drizzle Kit configuration.

## Responsibilities

- Define auth tables used by Better Auth: `user`, `session`, `account`, `verification`.
- Define product/domain tables: `organization`, `member`, `product`.
- Export the Drizzle `db` client from `src/index.ts`.
- Export schema objects from `src/schema.ts`.
- Store generated migrations in `packages/db/migrations/`.

## Commands

Run from the repository root:

```sh
bun run db:generate
bun run db:migrate
bun run db:push
bun run db:studio
bun run db:drop
bun run db:check
```

The commands load the root `.env` file via `bun --env-file=../../.env` inside the package script.

## Environment

Required root variable:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vend1k
```

For Docker Compose, the service may override `DATABASE_URL` to use the compose database hostname (`db`) while the root `.env` remains the single source for local development.

## Adding schema

1. Add tables to `packages/db/src/schema.ts`.
2. Export any new tables from the same file.
3. Run `bun run db:generate`.
4. Apply with `bun run db:migrate` or use `bun run db:push` during local prototyping.
