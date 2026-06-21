import { handle } from "hono/vercel";
import { app } from "./app.js";

// Vercel serverless entry. tsdown bundles this (and all workspace deps) into a
// single self-contained api/index.js, because Vercel runs source directly and
// Node cannot import the workspace packages' raw .ts files. See tsdown.config.ts.
export const config = { runtime: "nodejs" };

export default handle(app);
