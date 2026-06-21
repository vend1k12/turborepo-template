import { getRequestListener } from "@hono/node-server";
import { app } from "./app.js";

// Vercel serverless entry. tsdown bundles this (and all workspace deps) into a
// single self-contained file (see scripts/vercel-build.mjs), deployed as a Node
// function via the Build Output API.
//
// getRequestListener turns Hono's Web `fetch` handler into a Node
// (req, res) => void listener, which is the signature the Build Output API's
// Nodejs launcher invokes. Exporting app.fetch (Web style) is ignored there.
export default getRequestListener(app.fetch);
