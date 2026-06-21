"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../client";
import { queryKeys } from "../query-keys";

// Lightweight API diagnostics — useful for a status indicator.
export function useHealth() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: async () => {
      const res = await api.api.health.$get();
      if (!res.ok) throw new Error("API unhealthy");
      return res.json();
    },
    refetchInterval: 30_000,
    retry: false,
  });
}
