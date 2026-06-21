import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@vend1k/ui/globals.css";
import { fontVariables } from "@vend1k/ui/components/themes/font.config";
import { RootProviders } from "@vend1k/ui/components/root-providers";
import { cn } from "@vend1k/ui/lib/utils";

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const metadata: Metadata = {
  title: "vend1k User Portal",
  description: "Personal user dashboard and account management",
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="en" data-theme="claude" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "bg-background text-foreground min-h-screen overflow-x-hidden overscroll-none font-sans antialiased",
          fontVariables,
        )}
      >
        <RootProviders defaultTheme="system">{children}</RootProviders>
      </body>
    </html>
  );
}
