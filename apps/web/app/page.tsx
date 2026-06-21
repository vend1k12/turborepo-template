import type { ReactNode } from "react";
import { ThemeModeToggle } from "@vend1k/ui/components/themes/theme-mode-toggle";
import Link from "next/link";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? "http://localhost:3001";
const USER_URL = process.env.NEXT_PUBLIC_USER_URL ?? "http://localhost:3002";
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? "http://localhost:3003";

export default function Home(): ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-serif font-semibold tracking-tight text-primary">
              vend1k
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
              Personal
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a
                href={DOCS_URL}
                className="hover:text-primary transition-colors"
              >
                Docs
              </a>
              <a
                href={USER_URL}
                className="hover:text-primary transition-colors"
              >
                User Portal
              </a>
              <a
                href={ADMIN_URL}
                className="hover:text-primary transition-colors"
              >
                Admin Console
              </a>
            </nav>
            <ThemeModeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-serif font-normal tracking-tight leading-tight">
            A premium{" "}
            <span className="italic text-primary">Next.js & Hono</span> monorepo
            starter template.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Welcome to the vend1k personal workspace. This Turborepo integrates
            modern web technologies into a unified, high-performance monorepo
            for launching indie projects, apps, and services.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href={USER_URL}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              Go to User Portal
            </a>
            <a
              href={DOCS_URL}
              className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground border border-border font-medium hover:bg-muted transition-colors"
            >
              Explore the Docs
            </a>
          </div>
        </div>

        {/* Bento Grid */}
        <section className="mt-20 md:mt-32">
          <h2 className="text-2xl font-serif font-medium tracking-tight mb-8">
            System Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium font-serif">
                Apps & Dashboards
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Includes apps/web (this landing), apps/user (the secure Next.js
                portal), and apps/admin (the Shadcn admin panel).
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium font-serif">
                Robust Authentication
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Backed by Better Auth with database session persistence,
                supporting secure email/password credential signup.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium font-serif">
                Unified API & Schema
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Shared TypeScript packages/db (Drizzle ORM) and
                packages/api-client to invoke Hono endpoints type-safely.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} vend1k. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
