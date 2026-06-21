import { describe, it, expect } from "vitest";
import { app } from "./app.js";

describe("API health check", () => {
  it("should return ok and status 200", async () => {
    const res = await app.request("/api/health");
    const body = (await res.json()) as {
      status: string;
      timestamp: string;
      uptime: number;
    };
    expect(body.status).toBe("ok");
    expect(body.timestamp).toBeDefined();
    expect(body.uptime).toBeTypeOf("number");
  });
});
