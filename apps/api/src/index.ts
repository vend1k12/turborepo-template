import { app } from "./app.js";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

console.log(`Starting API server on port ${port}...`);

export default {
  port,
  fetch: app.fetch,
};

export type { AppType } from "./app.js";
