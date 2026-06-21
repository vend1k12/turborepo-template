import type { NavGroup } from "@vend1k/ui/types/nav";

/**
 * User portal navigation. Single source of truth feeding the sidebar, the
 * command palette, and breadcrumbs (via @vend1k/ui's AppShell).
 */
export const navGroups: NavGroup[] = [
  {
    label: "Personal Mode",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: "dashboard",
        shortcut: ["d", "d"],
        isActive: false,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: "profile",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Organizations",
        url: "/organizations",
        icon: "workspace",
        shortcut: ["o", "o"],
        isActive: false,
        items: [],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: "settings",
        shortcut: ["s", "s"],
        isActive: false,
        items: [],
      },
    ],
  },
];
