import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@vend1k/ui/components/ui/card";
import { ThemeAppearance } from "@vend1k/ui/components/themes/theme-appearance";
import { PageContainer } from "@vend1k/ui/components/page-container";
import { AccountPanel } from "@/components/account-panel";

const preferences = [
  {
    title: "Personal mode by default",
    description: "Skip organization select at launch",
  },
  {
    title: "Email security notifications",
    description: "Alert on new session login location",
  },
] as const;

export default function SettingsPage(): ReactNode {
  return (
    <PageContainer
      pageTitle="Settings"
      pageDescription="Configure system settings and account defaults."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Choose how the portal looks. System follows your device theme.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeAppearance className="w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>General Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {preferences.map((pref) => (
              <label
                key={pref.title}
                className="hover:bg-muted/30 flex cursor-pointer items-center justify-between rounded-lg border p-4 transition"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-foreground text-xs font-semibold">
                    {pref.title}
                  </span>
                  <span className="text-muted-foreground text-[11px]">
                    {pref.description}
                  </span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-primary size-4 rounded border"
                />
              </label>
            ))}
          </CardContent>
        </Card>

        <AccountPanel />
      </div>
    </PageContainer>
  );
}
