"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import { UserAvatarProfile } from "./user-avatar-profile";
import { Icons } from "./icons";

import type { NavGroup, SidebarFooterItem } from "../types/nav";

export interface SharedSidebarProps {
  navGroups: NavGroup[];
  user: {
    fullName: string;
    emailAddresses: Array<{ emailAddress: string }>;
    imageUrl?: string;
  };
  title: string;
  subtitle: string;
  /**
   * Extra links rendered in the footer dropdown above the sign-out action.
   * Defaults to a single "Overview" link pointing at `overviewHref`.
   */
  footerItems?: SidebarFooterItem[];
  /** Target of the default "Overview" footer link. Default: "/dashboard". */
  overviewHref?: string;
  /** Sign-out link target when no `onSignOut` handler is given. Default: "/". */
  signOutHref?: string;
  /** Sign-out handler; when provided, the footer renders a button instead of a link. */
  onSignOut?: () => void;
}

export function SharedSidebar({
  navGroups,
  user,
  title,
  subtitle,
  footerItems,
  overviewHref = "/dashboard",
  signOutHref = "/",
  onSignOut,
}: SharedSidebarProps) {
  const pathname = usePathname();
  const footerLinks: SidebarFooterItem[] =
    footerItems ?? [{ title: "Overview", href: overviewHref }];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="group-data-[collapsible=icon]:pt-4">
        <div className="flex items-center gap-2 px-4 py-2 group-data-[collapsible=icon]:p-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Icons.logo className="h-4 w-4" />
          </div>
          <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-sm leading-none text-foreground">{title}</span>
            <span className="text-[10px] text-muted-foreground leading-none">{subtitle}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent
        className="overflow-x-hidden"
        role="navigation"
        aria-label={subtitle}
      >
        {navGroups.map((group) => (
          <SidebarGroup key={group.label || "ungrouped"} className="py-0">
            {group.label && (
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            )}
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = (item.icon && item.icon in Icons ? Icons[item.icon as keyof typeof Icons] : Icons.logo);
                return item.items && item.items.length > 0 ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={pathname === item.url}
                        >
                          {item.icon && <Icon />}
                          <span>{item.title}</span>
                          <Icons.chevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <UserAvatarProfile user={user} showInfo />
                  <Icons.chevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserAvatarProfile user={user} showInfo />
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {footerLinks.map((link) => {
                    const LinkIcon =
                      link.icon && link.icon in Icons
                        ? Icons[link.icon]
                        : null;
                    return (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noreferrer" : undefined}
                          className="w-full cursor-pointer"
                        >
                          {LinkIcon && <LinkIcon className="mr-2 size-4" />}
                          {link.title}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {onSignOut ? (
                  <DropdownMenuItem
                    onSelect={onSignOut}
                    className="w-full cursor-pointer"
                  >
                    Sign out
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href={signOutHref} className="w-full cursor-pointer">
                      Sign out
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
