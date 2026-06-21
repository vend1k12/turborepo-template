// Build the API into a Vercel Build Output API v3 deployment.
//
// Why: Vercel runs source directly and Node can't import the workspace
// packages' raw .ts files (ERR_MODULE_NOT_FOUND). So we bundle everything into
// a single self-contained JS file with tsdown, then lay it out as a Node
// serverless function under .vercel/output/ and route all paths to it.
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, copyFileSync, rmSync } from "node:fs";

const OUT = ".vercel/output";
const FUNC = `${OUT}/functions/index.func`;

// 1. Bundle src/vercel.ts (+ all deps) into api/index.js via tsdown.
//    Use the locally installed binary so it resolves on Vercel and locally.
execSync("tsdown", {
  stdio: "inherit",
  env: { ...process.env, PATH: `./node_modules/.bin:${process.env.PATH}` },
});

// 2. Lay out the Build Output API structure.
rmSync(OUT, { recursive: true, force: true });
mkdirSync(FUNC, { recursive: true });
copyFileSync("api/index.js", `${FUNC}/index.js`);

// 3. Function config: Node serverless launcher pointing at the bundle.
writeFileSync(
  `${FUNC}/.vc-config.json`,
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "index.js",
      launcherType: "Nodejs",
      shouldAddHelpers: false,
    },
    null,
    2,
  ),
);

// 4. The bundle is ESM; mark the function package as a module.
writeFileSync(
  `${FUNC}/package.json`,
  JSON.stringify({ type: "module" }, null, 2),
);

// 5. Top-level config: route every request to the single function.
writeFileSync(
  `${OUT}/config.json`,
  JSON.stringify(
    {
      version: 3,
      routes: [{ src: "/.*", dest: "/index" }],
    },
    null,
    2,
  ),
);

console.log("Build Output API ready at .vercel/output");
