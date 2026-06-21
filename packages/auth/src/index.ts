import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import {
  db,
  users,
  sessions,
  accounts,
  verifications,
} from "@vend1k/db";

const userOrigin =
  process.env.NEXT_PUBLIC_USER_URL || "http://localhost:3002";
const adminOrigin =
  process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3003";

const isProduction = process.env.NODE_ENV === "production";

const PLACEHOLDER_SECRET = "placeholder-secret-must-be-32-characters-long";

// Fail closed: a missing/placeholder signing secret in production means every
// session token would be signed with a public, known value (forgeable
// sessions). The placeholder exists ONLY so local dev compiles without env
// setup; in production we reject it, an empty value, and anything too short.
function resolveSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (isProduction) {
    if (!secret || secret === PLACEHOLDER_SECRET || secret.length < 32) {
      throw new Error(
        "BETTER_AUTH_SECRET must be a real secret of at least 32 characters in production. Refusing to start with a missing or placeholder secret.",
      );
    }
    return secret;
  }
  return secret || PLACEHOLDER_SECRET;
}

function resolveBaseURL(): string {
  const url = process.env.BETTER_AUTH_URL;
  if (url) return url;
  if (isProduction) {
    throw new Error(
      "BETTER_AUTH_URL is required in production. Refusing to start with a localhost fallback.",
    );
  }
  return "http://localhost:3000";
}

// Better Auth server instance configured with Drizzle adapter and email/password provider
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Frontends live on different origins than the API, so they must be trusted.
  // The exact prod origins come from env; "https://*.vercel.app" trusts every
  // Vercel preview deploy (each PR gets a fresh random hostname). Wildcard
  // matching here is Better Auth's own — the CORS layer uses @vend1k/shared.
  trustedOrigins: [userOrigin, adminOrigin, "https://*.vercel.app"],
  plugins: [admin()],
  secret: resolveSecret(),
  baseURL: resolveBaseURL(),
  advanced: {
    // In prod the apps and API are on different sites (different *.vercel.app
    // hosts), so the session cookie is cross-site: it needs sameSite "none" +
    // secure, plus partitioned (CHIPS) which browsers increasingly require for
    // foreign cookies. On localhost everything shares host "localhost" (only
    // the port differs), so sameSite "lax" works without HTTPS.
    defaultCookieAttributes: isProduction
      ? { sameSite: "none", secure: true, partitioned: true }
      : { sameSite: "lax" },
  },
});

export type Auth = typeof auth;
export * from "better-auth";
