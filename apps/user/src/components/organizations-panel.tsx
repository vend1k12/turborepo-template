"use client";

import {
  useCreateOrganization,
  useOrganizations,
} from "@vend1k/api-client/hooks";
import { Button } from "@vend1k/ui/components/ui/button";
import { Input } from "@vend1k/ui/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@vend1k/ui/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function OrganizationsPanel() {
  const { data: organizations, isLoading, isError } = useOrganizations();
  const createOrg = useCreateOrganization();
  const [name, setName] = useState("");

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Your organizations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Loading…</p>
          ) : isError ? (
            <p className="text-destructive text-sm">
              Couldn’t load your organizations. Please try again.
            </p>
          ) : organizations && organizations.length > 0 ? (
            <ul className="space-y-2">
              {organizations.map((org) => (
                <li
                  key={org.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span className="text-sm font-semibold">{org.name}</span>
                  <span className="text-muted-foreground text-xs capitalize">
                    {org.role}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">
              No organizations yet. Create one below.
            </p>
          )}

          <form
            className="flex gap-2 pt-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              createOrg.mutate(
                { name, slug: slugify(name) },
                {
                  onSuccess: () => {
                    toast.success("Organization created");
                    setName("");
                  },
                  onError: (err) => toast.error(err.message),
                },
              );
            }}
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New organization name"
            />
            <Button type="submit" disabled={createOrg.isPending}>
              Create
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optional Access</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Organizations are optional. Your personal account works fully
            without a team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
