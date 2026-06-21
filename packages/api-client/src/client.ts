import { hc } from "hono/client";
import type { AppType } from "@vend1k/api";
import { getBaseUrl } from "./index";

// Shared, type-safe Hono RPC client. Built with the concrete AppType so the
// full route map is preserved for InferResponseType and $get/$post calls.
// credentials: "include" sends the Better Auth session cookie cross-origin.
export const api = hc<AppType>(getBaseUrl(), {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, { ...init, credentials: "include" }),
});
