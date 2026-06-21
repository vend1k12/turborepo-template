import { describe, expect, it } from "bun:test";
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
} from "./permissions";

describe("Permission Helpers", () => {
  it("should check single permissions correctly based on roles", () => {
    expect(hasPermission("owner", "org:delete")).toBe(true);
    expect(hasPermission("admin", "org:delete")).toBe(false);
    expect(hasPermission("admin", "org:update")).toBe(true);
    expect(hasPermission("member", "product:create")).toBe(true);
    expect(hasPermission("member", "org:update")).toBe(false);
    expect(hasPermission("viewer", "product:view")).toBe(true);
    expect(hasPermission("viewer", "product:create")).toBe(false);
  });

  it("should check hasAnyPermission correctly", () => {
    expect(hasAnyPermission("admin", ["org:delete", "org:update"])).toBe(true);
    expect(hasAnyPermission("member", ["org:update", "member:add"])).toBe(
      false,
    );
    expect(hasAnyPermission("viewer", ["product:create", "product:view"])).toBe(
      true,
    );
  });

  it("should check hasAllPermissions correctly", () => {
    expect(hasAllPermissions("owner", ["org:delete", "product:create"])).toBe(
      true,
    );
    expect(hasAllPermissions("admin", ["org:update", "org:delete"])).toBe(
      false,
    );
    expect(
      hasAllPermissions("member", ["product:create", "product:view"]),
    ).toBe(true);
  });
});
