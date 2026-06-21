# User Portal (`apps/user`)

`apps/user` is the customer/personal dashboard, running on port `3002`.

## Responsibilities

- Personal dashboard.
- Profile page.
- Settings page.
- Optional organizations page.
- Email/password sign-in and sign-up screens.

## Personal mode

Organizations are optional. A user can use the portal without creating or joining an organization. Organization-aware features should check whether an active organization exists before requiring organization state.

## Auth integration

Frontend auth imports should come from `@vend1k/auth/client`. The server-side Better Auth instance lives behind `apps/api`.

Required root variables:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:4000
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Extension rules

- Do not import code from `apps/admin`.
- Use `@vend1k/ui` components for shared UI.
- Keep user-specific navigation and route guards in `apps/user`.
