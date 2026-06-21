"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import type { NavGroup, NavItem } from "../types/nav";

export interface BreadcrumbItem {
  title: string;
  link: string;
}

/**
 * Derives breadcrumb items from a flat lookup of the nav config.
 * Nav items are searched recursively for matching URLs.
 */
function buildNavLookup(navGroups: NavGroup[]): Record<string, string> {
  const lookup: Record<string, string> = {};

  function traverse(items: NavItem[]) {
    for (const item of items) {
      if (item.url) {
        lookup[item.url] = item.title;
      }
      if (item.items) {
        traverse(item.items);
      }
    }
  }

  for (const group of navGroups) {
    traverse(group.items);
  }

  return lookup;
}

export function useBreadcrumbs(navGroups: NavGroup[]): BreadcrumbItem[] {
  const pathname = usePathname();
  const navLookup = useMemo(() => buildNavLookup(navGroups), [navGroups]);

  return useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs: BreadcrumbItem[] = [];

    let currentPath = "";

    for (const segment of segments) {
      currentPath += `/${segment}`;
      
      const title = navLookup[currentPath] || 
        segment.charAt(0).toUpperCase() + segment.slice(1);

      crumbs.push({
        title,
        link: currentPath,
      });
    }

    return crumbs;
  }, [pathname, navLookup]);
}
