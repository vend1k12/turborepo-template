import { describe, it, expect } from "vitest";

const API_URL = process.env.BASE_API_URL || "http://localhost:4000";

describe("API Health Smoke Test", () => {
  it("returns a healthy status from /api/health", async () => {
    const res = await fetch(`${API_URL}/api/health`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty("status");
    expect(data.status).toMatch(/ok|healthy|up/i);
  });
});
