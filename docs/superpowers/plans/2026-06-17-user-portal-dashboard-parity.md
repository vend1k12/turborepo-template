# User Portal Dashboard Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `apps/user` feel like a complete portal by matching the admin dashboard shell structure and visual density.

**Architecture:** Keep the implementation local to `apps/user` to avoid destabilizing `apps/admin` during the template validation pass. Add focused user-owned shell components under `apps/user/components/portal/`, use them from a dashboard layout, and keep page content customer-facing instead of admin-facing.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS v4 tokens, Playwright smoke tests, `bun` scripts.

---

## File Structure

- Modify `tests/e2e/smoke.spec.ts` to assert that the user app exposes dashboard shell landmarks and navigation, not just any title.
- Modify `apps/user/app/layout.tsx` to keep metadata and global CSS only.
- Modify `apps/user/app/globals.css` to use a Claude/admin-compatible theme token set and portal shell utilities.
- Create `apps/user/components/portal/portal-nav.ts` for user portal navigation data.
- Create `apps/user/components/portal/portal-sidebar.tsx` for the persistent left navigation.
- Create `apps/user/components/portal/portal-header.tsx` for sticky header, breadcrumbs, search affordance, and user actions.
- Create `apps/user/components/portal/portal-shell.tsx` for the shell wrapper used by dashboard/profile/org/settings pages.
- Modify `apps/user/app/dashboard/page.tsx`, `apps/user/app/profile/page.tsx`, `apps/user/app/organizations/page.tsx`, and `apps/user/app/settings/page.tsx` to render inside `PortalShell` with dense dashboard content.
- Modify `apps/user/app/page.tsx` to route users into the portal and present the portal as a full product, not a stub.

---

### Task 1: Add failing user shell smoke test

**Files:**
- Modify: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Replace the user smoke test body with shell expectations**

```ts
  test("User App exposes a full dashboard shell", async ({ page }) => {
    await page.goto(`${USER_URL}/dashboard`);

    await expect(page).toHaveTitle(/vend1k User Portal/);
    await expect(page.getByRole("navigation", { name: "User portal" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    await expect(page.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "href",
      "/profile",
    );
    await expect(page.getByRole("button", { name: "Search user portal" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "User overview" })).toBeVisible();
  });
```

- [ ] **Step 2: Run the targeted E2E test and verify it fails for missing shell**

Run:

```bash
bunx playwright test tests/e2e/smoke.spec.ts -g "User App exposes a full dashboard shell"
```

Expected: FAIL because `navigation[name="User portal"]` or `Search user portal` is missing.

---

### Task 2: Implement local user portal shell

**Files:**
- Create: `apps/user/components/portal/portal-nav.ts`
- Create: `apps/user/components/portal/portal-sidebar.tsx`
- Create: `apps/user/components/portal/portal-header.tsx`
- Create: `apps/user/components/portal/portal-shell.tsx`
- Modify: `apps/user/app/globals.css`

- [ ] **Step 1: Add navigation data**

Create `apps/user/components/portal/portal-nav.ts`:

```ts
export const portalNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    description: "Account summary and recent activity",
  },
  {
    title: "Profile",
    href: "/profile",
    description: "Personal identity and session details",
  },
  {
    title: "Organizations",
    href: "/organizations",
    description: "Optional workspaces and memberships",
  },
  {
    title: "Settings",
    href: "/settings",
    description: "Preferences and security defaults",
  },
] as const;
```

- [ ] **Step 2: Add sidebar component**

Create `apps/user/components/portal/portal-sidebar.tsx`:

```tsx
import Link from "next/link";
import { portalNavItems } from "./portal-nav";

export function PortalSidebar(): React.ReactNode {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-border bg-card/80 px-4 py-4 backdrop-blur lg:block">
      <div className="mb-8 rounded-2xl border border-border bg-background/70 p-4">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
          vend1k
        </p>
        <h1 className="mt-2 text-lg font-semibold tracking-tight">User Portal</h1>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Personal workspace, account settings, and optional organization access.
        </p>
      </div>

      <nav aria-label="User portal" className="space-y-2">
        {portalNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group block rounded-xl border border-transparent px-3 py-3 text-sm transition hover:border-border hover:bg-muted/70"
          >
            <span className="font-medium text-foreground">{item.title}</span>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
              {item.description}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 3: Add header component**

Create `apps/user/components/portal/portal-header.tsx`:

```tsx
import Link from "next/link";
import { portalNavItems } from "./portal-nav";

type PortalHeaderProps = {
  title: string;
};

export function PortalHeader({ title }: PortalHeaderProps): React.ReactNode {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/75 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Dashboard / {title}
          </p>
          <h2 className="mt-1 truncate text-lg font-semibold tracking-tight">{title}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden rounded-xl border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm transition hover:text-foreground md:inline-flex"
          >
            Search user portal
            <kbd className="ml-3 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </button>
          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-primary text-sm font-semibold text-primary-foreground"
          >
            VP
          </Link>
        </div>
      </div>

      <nav aria-label="User portal mobile" className="flex gap-2 overflow-x-auto border-t border-border px-4 py-2 lg:hidden">
        {portalNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Add shell wrapper**

Create `apps/user/components/portal/portal-shell.tsx`:

```tsx
import { PortalHeader } from "./portal-header";
import { PortalSidebar } from "./portal-sidebar";

type PortalShellProps = {
  title: string;
  children: React.ReactNode;
};

export function PortalShell({ title, children }: PortalShellProps): React.ReactNode {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <PortalSidebar />
        <section className="min-w-0 flex-1">
          <PortalHeader title={title} />
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 lg:py-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Replace user theme tokens with admin-compatible Claude tokens**

Modify `apps/user/app/globals.css` by keeping the Tailwind imports/theme mapping and replacing the `:root` and dark media tokens with a neutral Claude-compatible dark/light palette. Include these extra base styles:

```css
html {
  color-scheme: dark;
}

body {
  min-height: 100vh;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}
```

---

### Task 3: Convert user pages to full portal content

**Files:**
- Modify: `apps/user/app/dashboard/page.tsx`
- Modify: `apps/user/app/profile/page.tsx`
- Modify: `apps/user/app/organizations/page.tsx`
- Modify: `apps/user/app/settings/page.tsx`
- Modify: `apps/user/app/page.tsx`

- [ ] **Step 1: Update dashboard page**

`apps/user/app/dashboard/page.tsx` should import `PortalShell` and render:

- heading `User overview`
- 4 dense metric cards: Personal mode, Session, Organizations, Security
- account activity panel
- organization readiness panel

- [ ] **Step 2: Update profile page**

`apps/user/app/profile/page.tsx` should import `PortalShell` and render:

- heading `Profile`
- profile identity card with `user@vend1k.local`
- account state card with `Better Auth`
- no centered standalone page shell

- [ ] **Step 3: Update organizations page**

`apps/user/app/organizations/page.tsx` should import `PortalShell` and render:

- heading `Organizations`
- empty organization state
- role/permission explanation cards
- no centered standalone page shell

- [ ] **Step 4: Update settings page**

`apps/user/app/settings/page.tsx` should import `PortalShell` and render:

- heading `Settings`
- preference cards
- security notification card
- real checkbox inputs with labels

- [ ] **Step 5: Update home page copy**

`apps/user/app/page.tsx` should keep the marketing entry, but make it point to a complete portal:

- primary CTA: `/dashboard`
- secondary CTA: `/sign-in`
- three cards describing portal shell, personal mode, organizations

---

### Task 4: Verify and commit

**Files:**
- All modified files above

- [ ] **Step 1: Run targeted user shell test**

Run:

```bash
bunx playwright test tests/e2e/smoke.spec.ts -g "User App exposes a full dashboard shell"
```

Expected: PASS.

- [ ] **Step 2: Run full checks**

Run:

```bash
bun run check-types && bun run test && bun run db:check && bun run test:e2e
```

Expected:

- `check-types`: all successful
- `vitest`: all tests pass
- `drizzle-kit check`: `Everything's fine`
- Playwright: `4 passed`

- [ ] **Step 3: Agent-browser smoke user dashboard**

Run:

```bash
npx agent-browser open http://localhost:3002/dashboard
npx agent-browser wait --load networkidle
npx agent-browser snapshot -i -u
```

Expected snapshot includes:

- navigation `User portal`
- links `Overview`, `Profile`, `Organizations`, `Settings`
- button `Search user portal`
- heading `User overview`

- [ ] **Step 4: Commit**

Run:

```bash
git add apps/user tests/e2e/smoke.spec.ts docs/superpowers/plans/2026-06-17-user-portal-dashboard-parity.md
git commit -m "feat: align user portal dashboard shell"
```

---

## Self-Review

- Spec coverage: user portal gets admin-like shell, dense dashboard pages, preserved user-facing content, smoke coverage, full verification.
- Placeholder scan: no placeholders remain.
- Type consistency: `PortalShell`, `PortalHeader`, `PortalSidebar`, and `portalNavItems` names are consistent across tasks.
