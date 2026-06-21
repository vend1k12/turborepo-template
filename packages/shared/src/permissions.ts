export type Role = "owner" | "admin" | "member" | "viewer";

export type Permission =
  | "org:delete"
  | "org:update"
  | "org:invite"
  | "member:add"
  | "member:remove"
  | "member:update"
  | "product:create"
  | "product:update"
  | "product:delete"
  | "product:view";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: [
    "org:delete",
    "org:update",
    "org:invite",
    "member:add",
    "member:remove",
    "member:update",
    "product:create",
    "product:update",
    "product:delete",
    "product:view",
  ],
  admin: [
    "org:update",
    "org:invite",
    "member:add",
    "member:remove",
    "member:update",
    "product:create",
    "product:update",
    "product:delete",
    "product:view",
  ],
  member: ["product:create", "product:update", "product:view"],
  viewer: ["product:view"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  return permissions.includes(permission);
}

export function hasAnyPermission(
  role: Role,
  permissions: Permission[],
): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

export function hasAllPermissions(
  role: Role,
  permissions: Permission[],
): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}
