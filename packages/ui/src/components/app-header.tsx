"use client";
import * as React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { Breadcrumbs } from "./breadcrumbs";
import CommandPaletteTrigger from "./command-palette-trigger";
import { ThemeModeToggle } from "./themes/theme-mode-toggle";
import type { NavGroup } from "../types/nav";

export interface AppHeaderProps {
  /** Nav config used to derive breadcrumb labels. */
  navGroups: NavGroup[];
  /** Show the ⌘K command-palette trigger (requires an enclosing CommandPalette). Default: true. */
  showSearch?: boolean;
  /** Show breadcrumbs in the header. Default: true. */
  showBreadcrumbs?: boolean;
  /** Extra controls rendered on the right, before the search + theme toggle. */
  actions?: React.ReactNode;
}

/**
 * Shared sticky top bar for dashboard apps: sidebar trigger + breadcrumbs on the
 * left, optional actions + command-palette trigger + theme toggle on the right.
 */
export function AppHeader({
  navGroups,
  showSearch = true,
  showBreadcrumbs = true,
  actions,
}: AppHeaderProps) {
  return (
    <header className="bg-background/60 sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-2 backdrop-blur-md md:h-14">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        {showBreadcrumbs && (
          <>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs navGroups={navGroups} />
          </>
        )}
      </div>

      <div className="flex items-center gap-2 px-4">
        {actions}
        {showSearch && (
          <div className="hidden md:flex">
            <CommandPaletteTrigger />
          </div>
        )}
        <ThemeModeToggle />
      </div>
    </header>
  );
}
