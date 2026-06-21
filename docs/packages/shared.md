# Shared Package (`@vend1k/shared`)

`packages/shared` is safe to import from both browser and server code.

## Responsibilities

- Role and permission definitions.
- Shared API response shapes.
- Zod schemas that do not depend on server-only packages.
- Constants that need to be consistent across apps.

## Auth roles

Current roles:

```txt
owner
admin
member
viewer
```

Use `hasPermission`, `hasAnyPermission`, and `hasAllPermissions` from this package when checking role capabilities in frontend UX or server route helpers.

## Rule

Do not import Node-only modules, Drizzle clients, Better Auth server config, or environment secret loaders into this package.
