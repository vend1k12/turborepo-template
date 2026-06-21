# Deployment & Orchestration

The project ships with Docker Compose plus Caddy by default and an optional Traefik override.

## Default ports

```txt
web    -> 3000
docs   -> 3001
user   -> 3002
admin  -> 3003
api    -> 4000
postgres -> 5432
```

## Caddy routing

```txt
web.vend1k.local / localhost -> web:3000
docs.vend1k.local            -> docs:3001
app.vend1k.local             -> user:3002
admin.vend1k.local           -> admin:3003
api.vend1k.local             -> api:4000
```

## Commands

```sh
docker compose up -d --build
docker compose -f compose.yaml -f compose.traefik.yaml up -d --build
docker compose down -v
```

## Environment

Compose uses root `.env` through `env_file: .env`. The API service overrides container-only values that must point at Docker service names, such as `DATABASE_URL` using host `db`.

## Standalone builds

Dockerfiles set `BUILD_STANDALONE=true`, so Next.js apps copy `.next/standalone` into small runtime images.
