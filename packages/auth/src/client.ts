import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

// Better Auth client instance
export const authClient = createAuthClient({
  // Fallback BETTER_AUTH_URL to allow import-time compilation on frontend without environment variables
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",
  plugins: [adminClient()],
});

export type AuthClient = typeof authClient;
