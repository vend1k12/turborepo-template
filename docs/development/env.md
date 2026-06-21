# Root Environment & Configuration

The monorepo uses one root `.env` file for local development, builds, database commands, and Docker Compose runtime configuration.

## Files

```txt
.env.example  # tracked template
.env          # local/deploy values, ignored by git
```

Do not add app-local `.env` files. App scripts load the root file with relative `bun --env-file` paths.

## Variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `PORT` | API port | `4000` |
| `DATABASE_URL` | Postgres connection string | `postgresql://postgres:postgres@localhost:5432/vend1k` |
| `BETTER_AUTH_SECRET` | Better Auth secret, 32+ chars | placeholder |
| `BETTER_AUTH_URL` | Backend auth origin | `http://localhost:4000` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Frontend-visible auth URL | `http://localhost:4000` |
| `NEXT_PUBLIC_API_URL` | Frontend-visible API URL | `http://localhost:4000` |
| `BUILD_STANDALONE` | Next.js standalone output toggle | `false` local, `true` Docker build |
| `NEXT_PUBLIC_SENTRY_DISABLED` | Optional Sentry toggle | `true` |

## Docker Compose

`compose.yaml` uses `env_file: .env` for app services and overrides service-local values when container DNS differs from localhost, for example `DATABASE_URL=postgresql://postgres:postgres@db:5432/vend1k` for the API container.
