"use client";

import { authClient } from "@vend1k/auth/client";

// Reactive session hook backed by Better Auth's nanostore. Re-renders on
// sign-in / sign-out across the app.
export function useSession() {
  return authClient.useSession();
}
