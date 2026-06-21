"use client";

import { useSession } from "@vend1k/api-client/hooks";
import { useChangePassword, useUpdateProfile } from "@vend1k/api-client/hooks";
import { Button } from "@vend1k/ui/components/ui/button";
import { Input } from "@vend1k/ui/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@vend1k/ui/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ProfileForms() {
  const { data: session } = useSession();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (session?.user.name) setName(session.user.name);
  }, [session?.user.name]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Identity Details</CardTitle>
          <CardDescription>{session?.user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile.mutate(
                { name },
                {
                  onSuccess: () => toast.success("Profile updated"),
                  onError: (err) => toast.error(err.message),
                },
              );
            }}
          >
            <label className="flex flex-col gap-2 text-sm font-medium">
              Name
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <Button type="submit" disabled={updateProfile.isPending}>
              Save changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update the password used for email sign-in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              changePassword.mutate(
                { currentPassword, newPassword },
                {
                  onSuccess: () => {
                    toast.success("Password changed");
                    setCurrentPassword("");
                    setNewPassword("");
                  },
                  onError: (err) => toast.error(err.message),
                },
              );
            }}
          >
            <label className="flex flex-col gap-2 text-sm font-medium">
              Current password
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              New password
              <Input
                type="password"
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <Button type="submit" disabled={changePassword.isPending}>
              Change password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
