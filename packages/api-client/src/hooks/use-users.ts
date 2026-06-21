"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { authClient } from "@vend1k/auth/client";
import { queryKeys } from "../query-keys";
import { unwrap } from "./unwrap";

// Platform-level roles recognized by the Better Auth admin plugin.
export type UserRole = "user" | "admin";

export interface UseUsersParams {
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

// Admin: paginated/searchable user list.
export function useUsers(params: UseUsersParams = {}) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () =>
      unwrap(
        authClient.admin.listUsers({
          query: {
            ...(params.search
              ? { searchField: "email", searchValue: params.search }
              : {}),
            limit: params.limit ?? 20,
            offset: params.offset ?? 0,
            ...(params.sortBy ? { sortBy: params.sortBy } : {}),
            ...(params.sortDirection
              ? { sortDirection: params.sortDirection }
              : {}),
          },
        }),
      ),
  });
}

export function useSetUserRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { userId: string; role: UserRole }) =>
      unwrap(authClient.admin.setRole(vars)),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.users.all }),
  });
}

export function useBanUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      userId: string;
      banReason?: string;
      banExpiresIn?: number;
    }) => unwrap(authClient.admin.banUser(vars)),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.users.all }),
  });
}

export function useUnbanUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { userId: string }) =>
      unwrap(authClient.admin.unbanUser(vars)),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.users.all }),
  });
}

export function useRemoveUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { userId: string }) =>
      unwrap(authClient.admin.removeUser(vars)),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.users.all }),
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      email: string;
      password: string;
      name: string;
      role?: UserRole;
    }) => unwrap(authClient.admin.createUser(vars)),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.users.all }),
  });
}
