"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@vend1k/auth/client";
import { queryKeys } from "../query-keys";
import { unwrap } from "./unwrap";

// Self-service profile/account hooks (Better Auth core, no admin role needed).
export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { name?: string; image?: string }) =>
      unwrap(authClient.updateUser(vars)),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.session }),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (vars: {
      currentPassword: string;
      newPassword: string;
      revokeOtherSessions?: boolean;
    }) => unwrap(authClient.changePassword(vars)),
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: (vars: { password?: string } = {}) =>
      unwrap(authClient.deleteUser(vars)),
  });
}

// Self-service session management (current user's own devices).
import { useQuery } from "@tanstack/react-query";

export function useMySessions() {
  return useQuery({
    queryKey: [...queryKeys.session, "list"],
    queryFn: () => unwrap(authClient.listSessions()),
  });
}

export function useRevokeMySession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { token: string }) =>
      unwrap(authClient.revokeSession(vars)),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: [...queryKeys.session, "list"] }),
  });
}
