# Development & Infrastructure Guides

This section covers the operations, configuration strategies, data architecture, and orchestration policies of `@vend1k/personal`.

## Guides

1. **[Root Environment & Configuration](./env.md)**
   Explains the single-source-of-truth `.env` file, environment validation rules, and client-exposed variables.
2. **[Scripts & Operations](./scripts.md)**
   Provides a directory of root-level and package-level bun/npm commands, package management guidelines, and Turborepo pipelining.
3. **[Database & Migrations](./database.md)**
   Covers PostgreSQL integration, Drizzle ORM workflows (migrations, generation, and push/studio operations).
4. **[Deployment & Docker](./deployment.md)**
   Details VPS and production deployment strategies using Caddy/Traefik reverse proxies and multi-stage Docker builds.
5. **[Better Auth Integration](./auth.md)**
   Delineates how **Better Auth** replaces legacy identity systems, how session persistence works, and how to verify auth operations locally.
