# Documentation Suite

Welcome to the central documentation for `@vend1k/personal`. This suite covers the Turborepo architecture, application configurations, core packages, development workflow, env management, database setup, and deployment processes.

## Table of Contents

- [Development Guides](./development/README.md)
  - [Root Environment & Configuration](./development/env.md)
  - [Scripts & Operations](./development/scripts.md)
  - [Database & Migrations](./development/database.md)
  - [Deployment & Docker](./development/deployment.md)
  - [Better Auth Configuration](./development/auth.md)
- [Applications](./apps/README.md)
  - [Web Frontend (apps/web)](./apps/web.md)
  - [Docs Portal (apps/docs)](./apps/docs.md)
  - [User Portal (apps/user)](./apps/user.md)
  - [Admin Console (apps/admin)](./apps/admin.md)
  - [Hono Backend API (apps/api)](./apps/api.md)
- [Shared Packages](./packages/README.md)
  - [UI Primitives & Design System (@vend1k/ui)](./packages/ui.md)
  - [Core Shared Logic (@vend1k/shared)](./packages/shared.md)
  - [Database & Drizzle ORM (@vend1k/db)](./packages/db.md)
  - [Better Auth Engine (@vend1k/auth)](./packages/auth.md)
  - [Hono RPC Client (@vend1k/api-client)](./packages/api-client.md)
  - [Tooling Configs (@vend1k/eslint-config & @vend1k/typescript-config)](./packages/config.md)

---

## Workspace Directory Map

```txt
.
├── apps/
│   ├── web/           # Public landing website (port 3000)
│   ├── docs/          # Technical docs portal (port 3001)
│   ├── user/          # Customer portal / dashboard (port 3002)
│   ├── admin/         # Internal operations dashboard (port 3003)
│   └── api/           # Central Hono API + Better Auth backend (port 4000)
├── packages/
│   ├── ui/            # UI components and styles
│   ├── shared/        # Constants, permissions, validation schemas
│   ├── db/            # Database client and migrations
│   ├── auth/          # Better Auth setup and client hooks
│   ├── api-client/    # Fully-typed RPC client factory
│   ├── eslint-config/ # Monorepo ESLint configurations
│   └── typescript-config/ # Base and framework tsconfigs
├── docs/              # Markdown guides and resources (this directory)
└── docker/            # Docker configurations and setup files
```
