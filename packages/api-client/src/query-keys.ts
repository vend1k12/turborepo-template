import type { PaginationParams } from "@vend1k/shared";

// Centralized React Query key factory so queries and invalidations stay in sync.
export const queryKeys = {
  session: ["session"] as const,
  health: ["health"] as const,

  users: {
    all: ["users"] as const,
    list: (params?: Partial<PaginationParams>) =>
      ["users", "list", params ?? {}] as const,
    detail: (id: string) => ["users", "detail", id] as const,
    sessions: (id: string) => ["users", "sessions", id] as const,
  },

  organizations: {
    all: ["organizations"] as const,
    list: () => ["organizations", "list"] as const,
  },

  products: {
    all: ["products"] as const,
    byOrg: (orgId: string) => ["products", "org", orgId] as const,
  },
} as const;
