"use client";
import * as React from "react";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { SharedSidebar, type SharedSidebarProps } from "./shared-sidebar";
import CommandPalette from "./command-palette";
import { AppHeader, type AppHeaderProps } from "./app-header";
import { InfobarProvider } from "./ui/infobar";
import { InfoSidebar } from "./info-sidebar";

export interface AppShellProps
  extends Omit<SharedSidebarProps, "navGroups">,
    Pick<AppHeaderProps, "showSearch" | "showBreadcrumbs" | "actions"> {
  navGroups: SharedSidebarProps["navGroups"];
  children: React.ReactNode;
  /** Initial sidebar open state (pass the persisted cookie value from the server layout). */
  defaultSidebarOpen?: boolean;
  /**
   * Mount the right-hand contextual info rail (+ Cmd+I hotkey).
   * Off by default; admin opts in, user stays without it.
   */
  infoSidebar?: boolean;
}

/**
 * The unified dashboard shell shared by admin and user apps.
 *
 * Composition: CommandPalette (⌘K + nav/theme hotkeys) → SidebarProvider →
 * SharedSidebar + SidebarInset(AppHeader + children), optionally wrapped in the
 * Infobar context with a right-hand InfoSidebar.
 *
 * Apps mount this once in their dashboard `layout.tsx`; pages render plain
 * content (typically inside `PageContainer`) and no longer wrap themselves.
 */
export function AppShell({
  navGroups,
  user,
  title,
  subtitle,
  footerItems,
  overviewHref,
  signOutHref,
  onSignOut,
  showSearch,
  showBreadcrumbs,
  actions,
  defaultSidebarOpen = false,
  infoSidebar = false,
  children,
}: AppShellProps) {
  const body = infoSidebar ? (
    <InfobarProvider defaultOpen={false}>
      {children}
      <InfoSidebar side="right" />
    </InfobarProvider>
  ) : (
    children
  );

  return (
    <CommandPalette navGroups={navGroups}>
      <SidebarProvider defaultOpen={defaultSidebarOpen}>
        <SharedSidebar
          navGroups={navGroups}
          user={user}
          title={title}
          subtitle={subtitle}
          footerItems={footerItems}
          overviewHref={overviewHref}
          signOutHref={signOutHref}
          onSignOut={onSignOut}
        />
        <SidebarInset className="min-w-0 flex-1">
          <AppHeader
            navGroups={navGroups}
            showSearch={showSearch}
            showBreadcrumbs={showBreadcrumbs}
            actions={actions}
          />
          {body}
        </SidebarInset>
      </SidebarProvider>
    </CommandPalette>
  );
}
