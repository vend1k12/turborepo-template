import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-serverless";
import { Pool as PgPool } from "pg";
import { Pool as NeonPool } from "@neondatabase/serverless";
import * as schema from "./schema";

// Placeholder connection string to allow import-time compilation without real database credentials
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/vend1k";

// Driver selection: the Neon serverless driver talks to Neon over WebSocket/HTTP
// and does NOT speak to a plain local Postgres without a separate ws-proxy. So
// we use it only for real Neon connections (serverless/prod) and fall back to
// node-postgres for local Docker Postgres and CI. Override with DB_DRIVER=neon|pg.
const useNeon =
  (process.env.DB_DRIVER ?? (/\.neon\.tech/i.test(DATABASE_URL) ? "neon" : "pg")) ===
  "neon";

function createDb() {
  if (useNeon) {
    const pool = new NeonPool({ connectionString: DATABASE_URL });
    return { db: drizzleNeon(pool, { schema }), pool };
  }
  const pool = new PgPool({ connectionString: DATABASE_URL });
  return { db: drizzlePg(pool, { schema }), pool };
}

const created = createDb();

export const db = created.db;
export const pool = created.pool;

export * from "./schema";
