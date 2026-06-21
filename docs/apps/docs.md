# Docs Portal (apps/docs)

`apps/docs` is the technical documentation portal serving developers and internal coordinators. It runs on port `3001`.

## Navigation & Routing

The portal is built around a dynamic slug structure that reads docs files and displays them in a clean developer layout.

- `/` — Index landing page mapping available categories.
- `/docs/[slug]` — Markdown layout displaying guides or examples.

## Data Schema (`lib/docs-data.ts`)

The portal's content list is defined in `lib/docs-data.ts` using the `DocPage` interface. This mapping supports HTML strings or custom components to allow clean typography and styled code highlights.

```typescript
export interface DocPage {
  slug: string;
  title: string;
  category: "Guides" | "Examples";
  content: string;
}
```

## Adding New Pages

To publish new guides to the docs app:

1. Write the new topic guide under `docs/`.
2. Open `apps/docs/lib/docs-data.ts`.
3. Add a new `DocPage` entry to the `DOCS_PAGES` array containing your markdown content.
