import type { ReactNode } from "react";
import Link from "next/link";

export default function TermsPage(): ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-serif font-semibold text-primary"
          >
            vend1k
          </Link>
          <Link
            href="/"
            className="text-sm hover:text-primary transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-grow max-w-3xl mx-auto px-6 py-12 space-y-8">
        <h1 className="text-3xl md:text-4xl font-serif font-normal tracking-tight text-primary">
          Terms of Service
        </h1>
        <p className="text-muted-foreground text-sm">
          Last updated: June 17, 2026
        </p>

        <div className="prose prose-stone dark:prose-invert font-light text-muted-foreground text-sm space-y-6 leading-relaxed">
          <p>
            Welcome to the vend1k personal template. By accessing or using our
            websites and services, you agree to comply with and be bound by
            these Terms of Service.
          </p>

          <h2 className="text-xl font-serif font-medium pt-4 text-foreground">
            1. Use of Service
          </h2>
          <p>
            You agree to use our apps and services solely for lawful purposes
            and in accordance with these terms. You are responsible for
            maintaining the security of your account and credentials.
          </p>

          <h2 className="text-xl font-serif font-medium pt-4 text-foreground">
            2. Intellectual Property
          </h2>
          <p>
            All content, structure, design, code, and interfaces are the
            property of vend1k or licensed partners and are protected under
            copyright and trademark laws.
          </p>

          <h2 className="text-xl font-serif font-medium pt-4 text-foreground">
            3. Disclaimers
          </h2>
          <p>
            Our templates, services, and apps are provided &quot;as is&quot;
            without warranties of any kind, express or implied. Use at your own
            risk.
          </p>

          <h2 className="text-xl font-serif font-medium pt-4 text-foreground">
            4. Termination
          </h2>
          <p>
            We reserves the right to terminate or suspend access to your account
            and service at our sole discretion, without notice, for conduct that
            violates these Terms.
          </p>
        </div>
      </main>

      <footer className="border-t border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-6 py-6 text-xs text-muted-foreground">
          &copy; 2026 vend1k. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
