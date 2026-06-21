// ============================================================
// User Service — Data Access Layer
// ============================================================
// Reads run server-side (RSC prefetch in user-listing.tsx) using the Better
// Auth admin plugin via auth.api.listUsers. Mutations run client-side from the
// table via authClient.admin.* (see mutations.ts) so they carry the session
// cookie. Real Better Auth users are mapped into the table's User shape here.

"use server";

import { auth } from "@vend1k/auth";
import { headers } from "next/headers";
import type { User, UserFilters, UsersResponse } from "./types";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role?: string | null;
  banned?: boolean | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

function toTableUser(u: AdminUser): User {
  const [first, ...rest] = (u.name ?? "").split(" ");
  return {
    id: u.id,
    first_name: first ?? "",
    last_name: rest.join(" "),
    email: u.email,
    phone: "",
    role: u.role ?? "user",
    status: u.banned ? "Inactive" : "Active",
    created_at: new Date(u.createdAt).toISOString(),
    updated_at: new Date(u.updatedAt).toISOString(),
  };
}

// TanStack sorting state is JSON-encoded into UserFilters.sort by the table.
// Map the table column id to the Better Auth user field; ignore non-sortable
// or unknown columns so a bad id can't reach the query.
const SORTABLE_FIELDS: Record<string, string> = {
  name: "name",
  email: "email",
  created_at: "createdAt",
  updated_at: "updatedAt",
};

function parseSort(
  sort: string | undefined,
): { sortBy: string; sortDirection: "asc" | "desc" } | null {
  if (!sort) return null;
  try {
    const parsed = JSON.parse(sort) as Array<{ id: string; desc: boolean }>;
    const first = parsed[0];
    if (!first) return null;
    const sortBy = SORTABLE_FIELDS[first.id];
    if (!sortBy) return null;
    return { sortBy, sortDirection: first.desc ? "desc" : "asc" };
  } catch {
    return null;
  }
}

// The role filter is a multiSelect; nuqs encodes multiple values comma-joined.
// One value → eq, several → in (Better Auth filterValue accepts an array).
function parseRoleFilter(
  roles: string | undefined,
):
  | { filterField: "role"; filterOperator: "eq"; filterValue: string }
  | { filterField: "role"; filterOperator: "in"; filterValue: string[] }
  | null {
  if (!roles) return null;
  const values = roles.split(",").filter(Boolean);
  if (values.length === 0) return null;
  if (values.length === 1) {
    return { filterField: "role", filterOperator: "eq", filterValue: values[0]! };
  }
  return { filterField: "role", filterOperator: "in", filterValue: values };
}

export async function getUsers(filters: UserFilters): Promise<UsersResponse> {
  const limit = filters.limit ?? 10;
  const page = filters.page ?? 1;
  const offset = (page - 1) * limit;

  const sort = parseSort(filters.sort);
  const roleFilter = parseRoleFilter(filters.roles);

  const result = await auth.api.listUsers({
    headers: await headers(),
    query: {
      limit,
      offset,
      ...(filters.search
        ? { searchField: "email", searchValue: filters.search }
        : {}),
      ...(sort ?? {}),
      ...(roleFilter ?? {}),
    },
  });

  const users = (result.users as AdminUser[]).map(toTableUser);
  return {
    success: true,
    time: new Date().toISOString(),
    message: "Users fetched",
    total_users: result.total ?? users.length,
    offset,
    limit,
    users,
  };
}
