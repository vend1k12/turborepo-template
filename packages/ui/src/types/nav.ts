import type { Icons } from "../components/icons";

/**
 * Shared navigation contract for @vend1k/ui shell components.
 *
 * One source of truth consumed by SharedSidebar, the command palette, and the
 * breadcrumb hook. Apps keep their own nav DATA (config/nav-config.ts) but use
 * these TYPES so the shell, palette, and breadcrumbs stay in sync.
 *
 * Icons are referenced by string key into the package Icons map (resolved at
 * render time), so nav data can live in plain config modules without importing
 * React components.
 */

export type IconKey = keyof typeof Icons;

/**
 * RBAC visibility hints for a nav item. UI-only — real authorization still
 * happens server-side. All present conditions must hold for the item to show.
 */
export interface PermissionCheck {
  permission?: string;
  plan?: string;
  feature?: string;
  role?: string;
  requireOrg?: boolean;
}

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  /** Two-key kbar chord, e.g. ["d", "d"]. */
  shortcut?: [string, string];
  /** String key into the shared Icons map. */
  icon?: IconKey;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
  access?: PermissionCheck;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

/** A single configurable link rendered in the sidebar footer dropdown. */
export interface SidebarFooterItem {
  title: string;
  href: string;
  external?: boolean;
  icon?: IconKey;
}
