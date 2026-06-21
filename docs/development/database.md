# Database & Migrations

The database layer runs on **PostgreSQL** and uses **Drizzle ORM** for query building and schema migrations. All logic resides in `@vend1k/db`.

## Setup & Administration

Local developer workflows route connection commands through Drizzle Kit. Drizzle Kit reads environment configs directly from the root `.env` file via `bun --env-file`.

```sh
# Navigate to db package
cd packages/db

# 1. Generate new migration files after schema edits
bun db:generate

# 2. Apply pending migrations to the database
bun db:migrate

# 3. Force push schemas (development environment only)
bun db:push

# 4. Open Drizzle Studio visual console (opens localhost:4983)
bun db:studio
```

## Schema Declaration

Database schemas are defined in `packages/db/src/schema.ts`. This file exports all tables and relations:

- `users`, `sessions`, `accounts`, `verifications` (Standard session schemas mapped by Better Auth).
- Core workspace metadata tables and business entity schemas.

## Core Rules

- **Strict Type Exports**: Any database model types required client-side must be exported from `@vend1k/db/schema` to allow monorepo importing.
- **Null Safety**: Avoid mutating columns without creating a migration file to avoid schema mismatch errors.
