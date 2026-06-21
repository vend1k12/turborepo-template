import { mutationOptions } from "@tanstack/react-query";
import { getQueryClient } from "@vend1k/ui/lib/query-client";
import { authClient } from "@vend1k/auth/client";
import { userKeys } from "./queries";
import type { UserMutationPayload } from "./types";

type UserRole = "user" | "admin";

function normalizeRole(role: string): UserRole {
  return role === "admin" ? "admin" : "user";
}

function unwrap<T>(result: {
  data: T | null;
  error: { message?: string } | null;
}): T {
  if (result.error) {
    throw new Error(result.error.message ?? "Request failed");
  }
  return result.data as T;
}

export function invalidateUsers() {
  getQueryClient().invalidateQueries({ queryKey: userKeys.all });
}

// Create a real user via the admin plugin. The table form has no password
// field, and the admin plugin has no invite/email flow, so we generate a
// temporary password and return it for the admin to hand off; the user can
// later reset it themselves.
export const createUserMutation = mutationOptions({
  mutationFn: async (data: UserMutationPayload) => {
    const name = `${data.first_name} ${data.last_name}`.trim();
    const tempPassword = crypto.randomUUID();
    const user = unwrap(
      await authClient.admin.createUser({
        email: data.email,
        name,
        password: tempPassword,
        role: normalizeRole(data.role),
      }),
    );
    return { user, tempPassword };
  },
  onSuccess: invalidateUsers,
});

// Update applies the platform role and ban status (the only mutable
// server-side attributes the admin plugin exposes for the table).
export const updateUserMutation = mutationOptions({
  mutationFn: async ({
    id,
    values,
  }: {
    id: string;
    values: UserMutationPayload;
  }) => {
    await unwrap(
      await authClient.admin.setRole({
        userId: id,
        role: normalizeRole(values.role),
      }),
    );
    if (values.status === "Inactive") {
      await unwrap(await authClient.admin.banUser({ userId: id }));
    } else {
      await unwrap(await authClient.admin.unbanUser({ userId: id }));
    }
    return { id };
  },
  onSuccess: invalidateUsers,
});

export const deleteUserMutation = mutationOptions({
  mutationFn: async (id: string) =>
    unwrap(await authClient.admin.removeUser({ userId: id })),
  onSuccess: invalidateUsers,
});
