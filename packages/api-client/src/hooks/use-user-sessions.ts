"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { authClient } from "@vend1k/auth/client";
import { queryKeys } from "../query-keys";
import { unwrap } from "./unwrap";

// Admin: list a given user's active sessions/devices.
export function useUserSessions(userId: string) {
  return useQuery({
    queryKey: queryKeys.users.sessions(userId),
    queryFn: () =>
      unwrap(authClient.admin.listUserSessions({ userId })),
    enabled: Boolean(userId),
  });
}

export function useRevokeUserSession(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { sessionToken: string }) =>
      unwrap(authClient.admin.revokeUserSession(vars)),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.users.sessions(userId) }),
  });
}

export function useRevokeAllUserSessions(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      unwrap(authClient.admin.revokeUserSessions({ userId })),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.users.sessions(userId) }),
  });
}
