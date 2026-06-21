import { app } from "./app.js";

// Default export of the Hono app. Vercel detects the Hono framework and builds
// this as a serverless function (bundling workspace deps). For local Bun dev,
// see src/server.ts, which wraps this app in a Bun.serve config.
export default app;

export type { AppType } from "./app.js";
