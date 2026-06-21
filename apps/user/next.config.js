/** @type {import('next').NextConfig} */

// Proxy /api/* to the Hono API on its own domain. This makes the API appear
// same-origin to the browser, so the Better Auth session cookie is first-party
// on the frontend domain — which is what the server-side getSession() in the
// portal layout reads. Without this, the cookie lives on the API domain and the
// frontend can't see it (cross-site), so the post-login redirect bounces back.
// IMPORTANT: do NOT fall back to NEXT_PUBLIC_API_URL here — that points at this
// frontend's own origin (so /api requests can be same-origin), and proxying to
// our own origin would create an infinite rewrite loop. The proxy target must
// be the API's real domain.
const API_ORIGIN = process.env.API_PROXY_TARGET || "http://localhost:4000";
console.log("[next.config] API_PROXY_TARGET=", JSON.stringify(process.env.API_PROXY_TARGET), "API_ORIGIN=", API_ORIGIN);

const nextConfig = {
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_ORIGIN}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
