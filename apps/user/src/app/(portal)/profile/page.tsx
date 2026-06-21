import type { ReactNode } from "react";
import { PageContainer } from "@vend1k/ui/components/page-container";
import { ProfileForms } from "@/components/profile-forms";

export default function ProfilePage(): ReactNode {
  return (
    <PageContainer
      pageTitle="Profile"
      pageDescription="Personal identity credentials and session status."
    >
      <ProfileForms />
    </PageContainer>
  );
}
