"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../client";
import { queryKeys } from "../query-keys";

export function useOrganizations() {
  return useQuery({
    queryKey: queryKeys.organizations.list(),
    queryFn: async () => {
      const res = await api.api.organizations.$get();
      if (!res.ok) throw new Error("Failed to load organizations");
      const json = await res.json();
      return json.data;
    },
  });
}

export function useCreateOrganization() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars: {
      name: string;
      slug: string;
      logo?: string | null;
    }) => {
      const res = await api.api.organizations.$post(
        {},
        {
          init: {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vars),
          },
        },
      );
      if (!res.ok) throw new Error("Failed to create organization");
      const json = await res.json();
      return json.data;
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.organizations.all }),
  });
}
