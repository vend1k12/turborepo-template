import { test, expect } from "@playwright/test";

const WEB_URL = process.env.BASE_WEB_URL || "http://localhost:3000";
const DOCS_URL = process.env.BASE_DOCS_URL || "http://localhost:3001";
const USER_URL = process.env.BASE_USER_URL || "http://localhost:3002";
const ADMIN_URL = process.env.BASE_ADMIN_URL || "http://localhost:3003";

test.describe("Apps Smoke Tests", () => {
  test("Web landing page renders hero and app links", async ({ page }) => {
    await page.goto(WEB_URL);
    await expect(page).toHaveTitle(/vend1k/);
    await expect(
      page.getByRole("heading", { name: /monorepo starter template/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Go to User Portal" }),
    ).toBeVisible();
  });

  test("Docs app renders the documentation shell", async ({ page }) => {
    await page.goto(DOCS_URL);
    await expect(page).toHaveTitle(/docs/i);
    await expect(
      page.getByRole("link", { name: "Workspace Architecture" }),
    ).toBeVisible();
  });

  test("User App exposes a full dashboard shell", async ({ page }) => {
    await page.goto(`${USER_URL}/dashboard`);
    await expect(page).toHaveTitle(/vend1k User Portal/);
    // Nav links are present in the DOM (the sidebar may be collapsed at the
    // headless viewport, so assert presence/href rather than visibility).
    await expect(
      page.locator('a[href="/dashboard"]').first(),
    ).toHaveAttribute("href", "/dashboard");
    await expect(
      page.locator('a[href="/profile"]').first(),
    ).toHaveAttribute("href", "/profile");
    // Header controls are always visible regardless of sidebar state.
    await expect(
      page.getByRole("button", { name: "Search user portal" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "User overview" }).first(),
    ).toBeVisible();
  });

  test("Admin App renders the dashboard after redirect", async ({ page }) => {
    await page.goto(ADMIN_URL);
    await expect(page).toHaveURL(/\/dashboard\/overview/);
    await expect(page).toHaveTitle(/vend1k Admin Console/);
    await expect(
      page.getByRole("heading", { name: /Welcome back/i }),
    ).toBeVisible();
  });
});
