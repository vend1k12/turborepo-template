"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@vend1k/auth/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function DashboardSignOut() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() =>
        authClient.signOut().then(() => {
          startTransition(() => {
            router.push("/auth/sign-in");
            router.refresh();
          });
        })
      }
    >
      Sign out
    </Button>
  );
}
