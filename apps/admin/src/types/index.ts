/**
 * Navigation types are owned by @vend1k/ui (shared shell contract).
 * Re-exported here so existing `@/types` imports keep working.
 */
export type {
  IconKey,
  PermissionCheck,
  NavItem,
  NavGroup,
  SidebarFooterItem,
} from "@vend1k/ui/types/nav";

import type { NavItem } from "@vend1k/ui/types/nav";

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
