# UI Package (`@vend1k/ui`)

`packages/ui` is the shared shadcn/Tailwind v4 UI kit for all frontend apps.

## Contents

- shadcn primitives in `src/components/ui/`.
- Data table components in `src/components/ui/table/`.
- Theme components in `src/components/themes/`.
- Shared hooks in `src/hooks/`.
- Utility functions in `src/lib/`.
- Tailwind v4 CSS and the Claude theme in `src/styles/`.

## Exports

Import from explicit package subpaths:

```ts
import { Button } from "@vend1k/ui/components/ui/button";
import { DataTable } from "@vend1k/ui/components/ui/table/data-table";
import { cn } from "@vend1k/ui/lib/utils";
import "@vend1k/ui/globals.css";
```

## Theme

The template keeps one theme: `claude`.

- `src/styles/themes/claude.css`
- `src/components/themes/theme.config.ts`

Do not add multiple decorative themes by default. Add a new theme only when a real product needs it.

## Adding a shadcn component

1. Add the component source under `packages/ui/src/components/ui/`.
2. Keep imports package-local.
3. Add missing dependencies to `packages/ui/package.json`.
4. Run `bun run check-types` inside `packages/ui`.
