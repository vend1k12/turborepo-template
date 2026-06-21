# Auth Package (`@vend1k/auth`)

`packages/auth` contains the Better Auth integration split into server and client entrypoints.

## Server boundary

Use `@vend1k/auth` or `@vend1k/auth/server` only from server runtimes, primarily `apps/api`.

Responsibilities:

- Initialize Better Auth.
- Connect Better Auth to `@vend1k/db`.
- Configure email/password authentication.
- Keep secrets out of frontend bundles.

## Client boundary

Use `@vend1k/auth/client` from Next.js apps.

Responsibilities:

- Create the Better Auth browser client.
- Point frontend calls at `NEXT_PUBLIC_BETTER_AUTH_URL`.
- Keep frontend apps independent from database/server auth internals.

## Environment

Required root variables:

```env
BETTER_AUTH_SECRET=placeholder-secret-must-be-32-characters-long
BETTER_AUTH_URL=http://localhost:4000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:4000
```

## Initial scope

- Email/password only.
- No OAuth in the template baseline.
- Organizations are optional for `apps/user`.
- Admin access uses roles from `@vend1k/shared`: `owner`, `admin`, `member`, `viewer`.
