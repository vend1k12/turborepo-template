"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../client";
import { queryKeys } from "../query-keys";

// Org-scoped products.
export function useProducts(orgId: string) {
  return useQuery({
    queryKey: queryKeys.products.byOrg(orgId),
    queryFn: async () => {
      const res = await api.api.organizations[":orgId"].products.$get({
        param: { orgId },
      });
      if (!res.ok) throw new Error("Failed to load products");
      const json = await res.json();
      return json.data;
    },
    enabled: Boolean(orgId),
  });
}

export function useCreateProduct(orgId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars: {
      name: string;
      description?: string | null;
      price: number;
    }) => {
      const res = await api.api.organizations[":orgId"].products.$post(
        { param: { orgId } },
        {
          init: {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vars),
          },
        },
      );
      if (!res.ok) throw new Error("Failed to create product");
      const json = await res.json();
      return json.data;
    },
    onSuccess: () => {
      // Invalidate both the org-scoped list and the admin aggregate (useAllProducts).
      qc.invalidateQueries({ queryKey: queryKeys.products.byOrg(orgId) });
      qc.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

// Admin: all products across organizations.
export function useAllProducts() {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: async () => {
      const res = await api.api.admin.products.$get();
      if (!res.ok) throw new Error("Failed to load products");
      const json = await res.json();
      return json.data;
    },
  });
}
