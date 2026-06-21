# Unified Workspace Design Specification

**Goal:** Unify `apps/admin`, `apps/user`, and `apps/docs` under a single shared CSS design token set (Claude light/dark palette) and reuse the robust sidebar layout primitive from `packages/ui` rather than maintaining three different sidebars. Eliminate theme toggling. Add a sticky table-of-contents navigation on `apps/docs`.

---

## 1. Shared Styling & Themes

- We will keep ONLY the Claude theme (`packages/ui/src/styles/themes/claude.css`) as our global base color definitions and delete all other theme files from `@vend1k/ui`.
- Remove the theme switcher selection panel from both admin and packages. Keep a single clean theme mode selector or remove toggle options entirely to default to system-preference dark mode with clean fallbacks.
- Make `@vend1k/ui/styles/globals.css` import ONLY the unified Claude theme.
- Ensure `apps/admin`, `apps/user`, and `apps/docs` root layout and next configurations point to the same `@vend1k/ui/styles/globals.css` or direct Tailwind v4 imports.

---

## 2. Layout & Sidebar Parity

- Move or rewrite the sidebar config (`nav-config.ts` pattern) to be defined within each application.
- Build or export a highly configurable, beautiful, robust `Sidebar` component in `@vend1k/ui` that both `apps/admin` and `apps/user` reuse.
- The sidebar must support collapsing, icons, nested sub-items, and user footer avatar information exactly like the current admin sidebar, making it available to the user portal so it doesn't look like an "obrurok".

---

## 3. Documentation Improvements

- Implement a dynamic Right Table of Contents (TOC) bar on `apps/docs` that parses headings (`h2`, `h3`) from markdown content and lists clickable anchor links.
- Align the layout grid on the docs index and subpages to use the shared layout.
