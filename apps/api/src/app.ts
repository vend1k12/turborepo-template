import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { auth } from "@vend1k/auth";
import { db, users, organizations, members, products } from "@vend1k/db";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { type Role, hasPermission, isAllowedOrigin } from "@vend1k/shared";

// CORS: frontends run on separate origins and send auth cookies, so we must
// echo back the request's specific origin (never "*") and allow credentials.
// Exact production origins come from env; *.vercel.app previews and localhost
// are matched dynamically (see @vend1k/shared/origins for why).
const exactOrigins = [
  process.env.NEXT_PUBLIC_USER_URL || "http://localhost:3002",
  process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3003",
];

// Base app: CORS runs before any route. Kept separate from the route chain
// below because middleware does not contribute to the RPC route schema.
const base = new Hono().basePath("/api").use(
  "*",
  cors({
    origin: (origin) =>
      isAllowedOrigin(origin, exactOrigins) ? origin : exactOrigins[0],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    maxAge: 600,
  }),
);

// Shared auth context type
interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthSession {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
}

interface AuthContext {
  user: AuthUser;
  session: AuthSession;
}

// Helper: Get Better Auth session from request
async function getAuthSession(req: Request): Promise<AuthContext | null> {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  if (!session || !session.user || !session.session) {
    return null;
  }
  return session as AuthContext;
}

// Helper: assert the request's session belongs to a platform admin. Delegates
// to the Better Auth admin plugin's own permission logic (honors adminUserIds,
// custom roles, and comma-separated multi-roles) instead of a brittle
// `role === "admin"` string check. Returns true only for an authorized admin.
async function requireAdmin(req: Request): Promise<boolean> {
  const result = await auth.api.userHasPermission({
    headers: req.headers,
    body: { permissions: { user: ["list"] } },
  });
  return result.success === true;
}

// Custom authorization middleware for organization operations
async function getOrgMember(
  userId: string,
  orgId: string,
): Promise<{
  id: string;
  role: Role;
  organizationId: string;
  userId: string;
} | null> {
  const result = await db
    .select()
    .from(members)
    .where(and(eq(members.userId, userId), eq(members.organizationId, orgId)))
    .limit(1);

  if (result.length === 0) {
    return null;
  }
  const member = result[0];
  if (!member) {
    return null;
  }

  // Cast member.role string to Role type guard validation
  const roleCandidate = member.role;
  if (
    roleCandidate === "owner" ||
    roleCandidate === "admin" ||
    roleCandidate === "member" ||
    roleCandidate === "viewer"
  ) {
    return {
      id: member.id,
      userId: member.userId,
      organizationId: member.organizationId,
      role: roleCandidate,
    };
  }
  return null;
}

const createOrgSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  logo: z.string().nullable().optional(),
});

const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  price: z.number().int().nonnegative(), // price in cents
});

// Routes are method-chained off `base` so the Hono RPC route schema accumulates
// into `AppType` — defining them as separate `app.get(...)` statements would
// erase the per-route types and break the type-safe client.
export const app = base
  // Health check
  .get("/health", (c) => {
    return c.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  })
  // Better Auth handles all /api/auth/* routes (incl. admin plugin)
  .on(["GET", "POST"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  // Current user's profile (requires auth)
  .get("/user/profile", async (c) => {
    const authCtx = await getAuthSession(c.req.raw);
    if (!authCtx) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    return c.json({ success: true, user: authCtx.user });
  })
  // Admin: all users
  .get("/admin/users", async (c) => {
    const authCtx = await getAuthSession(c.req.raw);
    if (!authCtx) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    if (!(await requireAdmin(c.req.raw))) {
      return c.json({ error: "Forbidden: Admin access required" }, 403);
    }
    const allUsers = await db.select().from(users);
    return c.json({ success: true, data: allUsers });
  })
  // Admin: all products across organizations
  .get("/admin/products", async (c) => {
    const authCtx = await getAuthSession(c.req.raw);
    if (!authCtx) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    if (!(await requireAdmin(c.req.raw))) {
      return c.json({ error: "Forbidden: Admin access required" }, 403);
    }
    const allProducts = await db.select().from(products);
    return c.json({ success: true, data: allProducts });
  })
  // Organizations the current user belongs to
  .get("/organizations", async (c) => {
    const authCtx = await getAuthSession(c.req.raw);
    if (!authCtx) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const userMemberships = await db
      .select({
        id: organizations.id,
        name: organizations.name,
        slug: organizations.slug,
        logo: organizations.logo,
        role: members.role,
      })
      .from(members)
      .innerJoin(organizations, eq(members.organizationId, organizations.id))
      .where(eq(members.userId, authCtx.user.id));
    return c.json({ success: true, data: userMemberships });
  })
  // Create an organization (creator becomes owner)
  .post("/organizations", async (c) => {
    const authCtx = await getAuthSession(c.req.raw);
    if (!authCtx) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON body" }, 400);
    }

    const parsed = createOrgSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        { error: "Validation failed", details: parsed.error.format() },
        400,
      );
    }

    const { name, slug, logo } = parsed.data;
    const orgId = crypto.randomUUID();
    const now = new Date();

    await db.insert(organizations).values({
      id: orgId,
      name,
      slug,
      logo: logo || null,
      createdAt: now,
      updatedAt: now,
    });

    const memberId = crypto.randomUUID();
    await db.insert(members).values({
      id: memberId,
      organizationId: orgId,
      userId: authCtx.user.id,
      role: "owner",
      createdAt: now,
      updatedAt: now,
    });

    return c.json({
      success: true,
      data: { id: orgId, name, slug, logo, role: "owner" },
    });
  })
  // Org-scoped products list (requires membership)
  .get("/organizations/:orgId/products", async (c) => {
    const authCtx = await getAuthSession(c.req.raw);
    if (!authCtx) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const orgId = c.req.param("orgId");
    const member = await getOrgMember(authCtx.user.id, orgId);
    if (!member) {
      return c.json(
        { error: "Forbidden: Not a member of this organization" },
        403,
      );
    }

    const orgProducts = await db
      .select()
      .from(products)
      .where(eq(products.organizationId, orgId));
    return c.json({ success: true, data: orgProducts });
  })
  // Org-scoped product creation (requires product:create permission)
  .post("/organizations/:orgId/products", async (c) => {
    const authCtx = await getAuthSession(c.req.raw);
    if (!authCtx) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const orgId = c.req.param("orgId");
    const member = await getOrgMember(authCtx.user.id, orgId);
    if (!member) {
      return c.json(
        { error: "Forbidden: Not a member of this organization" },
        403,
      );
    }

    if (!hasPermission(member.role, "product:create")) {
      return c.json(
        { error: "Forbidden: Insufficient permissions to create product" },
        403,
      );
    }

    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Invalid JSON body" }, 400);
    }

    const parsed = createProductSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        { error: "Validation failed", details: parsed.error.format() },
        400,
      );
    }

    const { name, description, price } = parsed.data;
    const productId = crypto.randomUUID();
    const now = new Date();

    await db.insert(products).values({
      id: productId,
      name,
      description: description || null,
      price,
      organizationId: orgId,
      createdAt: now,
      updatedAt: now,
    });

    return c.json({
      success: true,
      data: { id: productId, name, description, price, organizationId: orgId },
    });
  })
  // Global error handler: normalize thrown errors into { success, error }.
  .onError((err, c) => {
    if (err instanceof HTTPException) {
      return c.json(
        {
          success: false,
          error: { message: err.message, code: "HTTP_ERROR" },
        },
        err.status,
      );
    }
    console.error("Unhandled API error:", err);
    return c.json(
      {
        success: false,
        error: { message: "Internal Server Error", code: "INTERNAL" },
      },
      500,
    );
  });

export type AppType = typeof app;
