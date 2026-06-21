"use client";

import { useBreadcrumbs } from "../hooks/use-breadcrumbs";
import type { NavGroup } from "../types/nav";
import { Icons } from "../components/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function Breadcrumbs({ navGroups }: { navGroups: NavGroup[] }) {
  const crumbs = useBreadcrumbs(navGroups);

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <BreadcrumbItem key={crumb.link}>
              {isLast ? (
                <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={crumb.link}>{crumb.title}</BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <Icons.slash />
                  </BreadcrumbSeparator>
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
