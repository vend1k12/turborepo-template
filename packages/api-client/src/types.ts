import type { InferResponseType } from "hono/client";
import type { authClient } from "@vend1k/auth/client";
import { api } from "./client";

// Response types inferred directly from the Hono RPC routes — these stay in
// sync with the server automatically.
export type OrganizationsResponse = InferResponseType<
  typeof api.api.organizations.$get
>;
export type AdminUsersResponse = InferResponseType<
  typeof api.api.admin.users.$get
>;
export type AdminProductsResponse = InferResponseType<
  typeof api.api.admin.products.$get
>;
export type HealthResponse = InferResponseType<typeof api.api.health.$get>;

// Session / user shapes come from Better Auth, including admin plugin fields
// (role, banned, banReason, banExpires).
export type Session = typeof authClient.$Infer.Session;
export type SessionUser = Session["user"];
