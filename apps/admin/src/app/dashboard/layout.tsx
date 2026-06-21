import CtaGithub from "@/components/layout/cta-github";
import { DashboardSignOut } from "@/components/layout/dashboard-sign-out";
import { navGroups } from "@/config/nav-config";
import { auth } from "@vend1k/auth";
import { AppShell } from "@vend1k/ui/components/app-shell";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "vend1k Admin Console",
  description: "Internal admin dashboard for vend1k personal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  // Gate the whole console: require a session, and require the platform-level
  // admin role (added by the Better Auth admin plugin).
  if (!session) {
    redirect("/auth/sign-in");
  }
  if (session.user.role !== "admin") {
    redirect("/auth/sign-in?error=forbidden");
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
      title="vend1k Admin"
      subtitle="Admin Console"
      overviewHref="/dashboard/overview"
      defaultSidebarOpen={defaultOpen}
      infoSidebar
      actions={
        <>
          <CtaGithub />
          <DashboardSignOut />
        </>
      }
    >
      {children}
    </AppShell>
  );
}
