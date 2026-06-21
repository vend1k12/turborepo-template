import type { ReactNode } from "react";
import { PageContainer } from "@vend1k/ui/components/page-container";
import { OrganizationsPanel } from "@/components/organizations-panel";

export default function OrganizationsPage(): ReactNode {
  return (
    <PageContainer
      pageTitle="Organizations"
      pageDescription="Join or create organization workspaces to collaborate."
    >
      <OrganizationsPanel />
    </PageContainer>
  );
}
