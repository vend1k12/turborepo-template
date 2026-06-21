// Single source of truth for cross-origin matching, shared by the API CORS
// config and Better Auth trustedOrigins. Pure string logic, browser-safe.
//
// Why a matcher instead of a static allowlist: Vercel generates a fresh random
// hostname for every preview deploy (e.g. admin-git-feat-x-acme.vercel.app),
// so the allowed set cannot be hardcoded. We allow the exact production origins
// from env, plus any *.vercel.app preview, plus localhost for dev.

export function isVercelPreviewOrigin(origin: string): boolean {
  try {
    const { protocol, hostname } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

export function isLocalhostOrigin(origin: string): boolean {
  try {
    const { hostname } = new URL(origin);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

export function isAllowedOrigin(
  origin: string | undefined | null,
  exactOrigins: string[],
): boolean {
  if (!origin) return false;
  if (exactOrigins.includes(origin)) return true;
  if (isVercelPreviewOrigin(origin)) return true;
  if (isLocalhostOrigin(origin)) return true;
  return false;
}
