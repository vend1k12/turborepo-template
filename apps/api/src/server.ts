import { app } from "./app.js";

// Local Bun entrypoint. `bun run dev` / `bun run start` use this to serve the
// Hono app over HTTP. On Vercel, src/index.ts (export default app) is used
// instead — the platform builds it into a serverless function.
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

console.log(`Starting API server on port ${port}...`);

export default {
  port,
  fetch: app.fetch,
};
