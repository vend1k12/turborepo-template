# Tooling Config Packages

The monorepo keeps lint and TypeScript defaults in shared packages.

## `@vend1k/eslint-config`

Contains shared ESLint presets for:

- base TypeScript packages;
- React library packages;
- Next.js apps.

Apps and packages should import from this package instead of maintaining duplicated ESLint rules.

## `@vend1k/typescript-config`

Contains shared `tsconfig` presets:

- `base.json` — strict common TypeScript options.
- `nextjs.json` — Next.js App Router projects.
- `react-library.json` — React component packages.

## Adding a new workspace

1. Add `@vend1k/eslint-config` and `@vend1k/typescript-config` to dev dependencies.
2. Extend the correct TS config.
3. Add scripts: `lint`, `check-types`, and `build` if the package emits artifacts.
