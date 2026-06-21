import { app } from "./app.js";

// Vercel serverless entry. tsdown bundles this (and all workspace deps) into a
// single self-contained file (see scripts/vercel-build.mjs), which is deployed
// as a Node function via the Build Output API.
//
// Hono is Web-standard: app.fetch is a (Request) => Response handler. Vercel's
// Node runtime accepts a Web `fetch` export, so we expose it directly rather
// than the (req, res) Node signature.
export const fetch = app.fetch;

export default app.fetch;
