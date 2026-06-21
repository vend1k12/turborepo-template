# Admin Console (`apps/admin`)

`apps/admin` is the internal operations dashboard, running on port `3003`.

## Responsibilities

- Admin overview and operational charts.
- User management example screens.
- Product CRUD example screens.
- Admin-only navigation and layouts.

## Runtime scope

The template keeps the admin runtime intentionally small:

```txt
/dashboard/overview
/dashboard/users
/dashboard/product
```

Demo features such as chat, kanban, notifications, forms, and icon galleries belong in documentation/examples, not in the production admin navigation.

## Auth and access

Admin auth uses Better Auth through `apps/api`. Frontend code should import `@vend1k/auth/client` only. Server/API access checks should use roles from `@vend1k/shared`.

Admin access should be limited to:

```txt
owner
admin
```

## UI conventions

- Use `PageContainer` for page shells.
- Use DataTable components from `@vend1k/ui` when shared migration is needed.
- Keep app-specific navigation in `apps/admin/src/config/nav-config.ts`.
- The only default theme is `claude`.
