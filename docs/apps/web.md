# Web Frontend (apps/web)

`apps/web` is the public-facing landing and marketing website for the product, running on port `3000`.

## Tech Stack & Styling

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, utilizing shared variables from `@vend1k/ui`.
- **Pre-rendering**: Statically pre-rendered routes for rapid initial loads and SEO indexing.

## Available Routes

- `/` — Homepage featuring marketing hero statements, value props, bento grid layout, and pricing grids.
- `/privacy` — Public privacy policies.
- `/terms` — Terms of service definitions.

## Extension Guidelines

- **Visual Assets**: Add SVG components to the `public/` folder to serve them statically.
- **Mock Interfaces**: Hardcode marketing constants and pricing structure lists inside localized configurations. Avoid connecting landing components directly to the database or internal API servers.
