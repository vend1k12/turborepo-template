import type { ReactNode } from "react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@vend1k/ui/components/ui/card";
import { Button } from "@vend1k/ui/components/ui/button";
import { PageContainer } from "@vend1k/ui/components/page-container";

const metrics = [
  ["Mode", "Personal"],
  ["Organizations", "Optional"],
  ["Role", "member"],
] as const;

export default function DashboardPage(): ReactNode {
  return (
    <PageContainer
      pageTitle="User overview"
      pageDescription="Overview of your personal workspace and active sessions."
    >
      <div className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map(([label, value]) => (
            <Card key={label}>
              <CardHeader>
                <CardDescription className="text-xs font-semibold uppercase tracking-[0.15em]">
                  {label}
                </CardDescription>
                <CardTitle className="text-3xl font-bold tracking-tight">
                  {value}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>
                No recent security logs or profile updates. System is online and
                healthy.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="justify-between">
            <CardHeader>
              <CardTitle>Hono API Connection</CardTitle>
              <CardDescription>
                Connected to `@vend1k/api-client` endpoints. Ready for
                organizations loading.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild size="sm">
                <Link href="/organizations">Manage organizations</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
