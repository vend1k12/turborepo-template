import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@vend1k/auth";
import { AppShell } from "@vend1k/ui/components/app-shell";
import { navGroups } from "@/config/nav-config";
import { PortalSignOut } from "@/components/portal-sign-out";

export default async function PortalLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactNode> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const user = {
    fullName: session.user.name,
    emailAddresses: [{ emailAddress: session.user.email }],
    imageUrl: session.user.image ?? undefined,
  };

  return (
    <AppShell
      navGroups={navGroups}
      user={user}
      title="vend1k Personal"
      subtitle="User Portal"
      defaultSidebarOpen={defaultOpen}
      actions={<PortalSignOut />}
    >
      {children}
    </AppShell>
  );
}
