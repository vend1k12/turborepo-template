"use client";

import {
  useDeleteAccount,
  useMySessions,
  useRevokeMySession,
} from "@vend1k/api-client/hooks";
import { Button } from "@vend1k/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@vend1k/ui/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AccountPanel() {
  const router = useRouter();
  const { data: sessions, isLoading, isError } = useMySessions();
  const revoke = useRevokeMySession();
  const deleteAccount = useDeleteAccount();

  return (
    <>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Devices currently signed in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Loading…</p>
          ) : isError ? (
            <p className="text-destructive text-sm">
              Couldn’t load your active sessions. Please try again.
            </p>
          ) : sessions && sessions.length > 0 ? (
            <ul className="space-y-2">
              {sessions.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border p-3 text-sm"
                >
                  <span className="text-muted-foreground truncate">
                    {s.userAgent ?? "Unknown device"}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={revoke.isPending}
                    onClick={() =>
                      revoke.mutate(
                        { token: s.token },
                        {
                          onSuccess: () => toast.success("Session revoked"),
                          onError: (err) => toast.error(err.message),
                        },
                      )
                    }
                  >
                    Revoke
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">No active sessions.</p>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2 border-destructive/40">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteAccount.isPending}
            onClick={() => {
              if (!confirm("Delete your account? This cannot be undone.")) {
                return;
              }
              deleteAccount.mutate(
                {},
                {
                  onSuccess: () => {
                    toast.success("Account deleted");
                    router.push("/sign-in");
                  },
                  onError: (err) => toast.error(err.message),
                },
              );
            }}
          >
            Delete account
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
