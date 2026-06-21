"use client";

import { authClient } from "@vend1k/auth/client";
import { Button } from "@vend1k/ui/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isSignUp = mode === "sign-up";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = isSignUp
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });

    if (result.error) {
      toast.error(result.error.message ?? "Authentication failed");
      return;
    }

    toast.success(isSignUp ? "Account created" : "Signed in");
    startTransition(() => {
      router.push("/dashboard");
      router.refresh();
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          vend1k personal
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          {isSignUp ? "Create account" : "Sign in"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Email/password auth is handled by Better Auth on the Hono API.
        </p>
        <form className="mt-8 flex flex-col gap-4" onSubmit={onSubmit}>
          {isSignUp && (
            <label className="flex flex-col gap-2 text-sm font-medium">
              Name
              <input
                className="rounded-lg border border-input bg-background px-3 py-2"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
              />
            </label>
          )}
          <label className="flex flex-col gap-2 text-sm font-medium">
            Email
            <input
              className="rounded-lg border border-input bg-background px-3 py-2"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Password
            <input
              className="rounded-lg border border-input bg-background px-3 py-2"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignUp ? "minimum 8 characters" : "••••••••"}
            />
          </label>
          <Button type="submit" disabled={pending}>
            {isSignUp ? "Create account" : "Continue"}
          </Button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <Link className="text-primary" href="/sign-in">
                Sign in
              </Link>
              .
            </>
          ) : (
            <>
              New here?{" "}
              <Link className="text-primary" href="/sign-up">
                Create an account
              </Link>
              .
            </>
          )}
        </p>
      </section>
    </main>
  );
}
