import { defineConfig } from "tsdown";

// Bundle the Vercel entry and ALL its dependencies (workspace + npm) into one
// self-contained file at api/index.js. Vercel runs this output directly; since
// nothing is left as a bare import, Node never tries to load a workspace .ts.
export default defineConfig({
  entry: ["src/vercel.ts"],
  outDir: "api",
  format: "esm",
  platform: "node",
  target: "node22",
  // Inline everything except Node builtins (node:*).
  noExternal: [/^(?!node:)/],
  dts: false,
  clean: true,
  // Emit a single self-contained file (no shared chunks) so Vercel routes one
  // api/index.js function with nothing to resolve at runtime.
  unbundle: false,
  outputOptions: {
    entryFileNames: "index.js",
    inlineDynamicImports: true,
  },
});
