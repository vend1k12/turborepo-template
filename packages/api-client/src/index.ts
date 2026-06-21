/**
 * Resolves the base URL for the API client. The API runs on a separate origin
 * from the frontends, so we always target NEXT_PUBLIC_API_URL — never the
 * window origin, which would point at the frontend host instead of the API.
 */
export function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "http://localhost:4000"
  );
}
