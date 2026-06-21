/** @type {import('next').NextConfig} */

// Proxy /api/* to the Hono API on its own domain. This makes the API appear
// same-origin to the browser, so the Better Auth session cookie is first-party
// on the frontend domain — which is what the server-side getSession() in the
// portal layout reads. Without this, the cookie lives on the API domain and the
// frontend can't see it (cross-site), so the post-login redirect bounces back.
const API_ORIGIN =
  process.env.API_PROXY_TARGET ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000";

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
