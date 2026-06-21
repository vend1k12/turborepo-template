import { nextJsConfig } from "@vend1k/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    rules: {
      // TanStack Form's form.Field / form.AppField / form.Subscribe use a
      // function-as-children render-prop API; this is intentional, not the
      // anti-pattern react/no-children-prop targets.
      "react/no-children-prop": "off",
      // Allow intentionally-unused args/vars prefixed with underscore
      // (e.g. required-but-unused callback params from third-party signatures).
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
