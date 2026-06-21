// Vercel Node entrypoint. Vercel discovers serverless functions in this `api/`
// directory and runs them on the Node.js runtime. The Bun entrypoint at
// src/index.ts stays for local `bun run dev`; this file is additive.
import { handle } from "hono/vercel";
import { app } from "../src/app";

export const config = { runtime: "nodejs" };

export default handle(app);
