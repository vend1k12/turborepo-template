import type { ReactNode } from "react";
import Link from "next/link";

export default function PrivacyPage(): ReactNode {
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
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm">
          Last updated: June 17, 2026
        </p>

        <div className="prose prose-stone dark:prose-invert font-light text-muted-foreground text-sm space-y-6 leading-relaxed">
          <p>
            At vend1k, we take your privacy seriously. This privacy policy
            describes what data we collect, how we use it, and how we protect
            your personal information.
          </p>

          <h2 className="text-xl font-serif font-medium pt-4 text-foreground">
            1. Data We Collect
          </h2>
          <p>
            We collect personal information that you voluntarily provide to us
            when you register on our platform, such as your email address and
            credentials.
          </p>

          <h2 className="text-xl font-serif font-medium pt-4 text-foreground">
            2. How We Use Data
          </h2>
          <p>
            We use the information we collect to provide and maintain your
            account, authenticate credentials, secure services, and respond to
            support queries.
          </p>

          <h2 className="text-xl font-serif font-medium pt-4 text-foreground">
            3. Security
          </h2>
          <p>
            We implement robust cryptographic safeguards and session controls
            (via Better Auth) to protect your account. Your passwords are
            encrypted before database storage.
          </p>

          <h2 className="text-xl font-serif font-medium pt-4 text-foreground">
            4. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@vend1k.local.
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
