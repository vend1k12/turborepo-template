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
  deps: { alwaysBundle: [/^(?!node:)/] },
  dts: false,
  clean: true,
  // Emit a single self-contained file (no shared chunks).
  outputOptions: {
    entryFileNames: "index.js",
    inlineDynamicImports: true,
  },
});
