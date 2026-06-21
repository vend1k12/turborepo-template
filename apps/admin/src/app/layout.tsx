import { fontVariables } from "@vend1k/ui/components/themes/font.config";
import { RootProviders } from "@vend1k/ui/components/root-providers";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "@vend1k/ui/globals.css";

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const metadata: Metadata = {
  title: "vend1k Admin Console",
  description: "Internal admin dashboard for vend1k personal",
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="claude">
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
          "bg-background overflow-x-hidden overscroll-none font-sans antialiased",
          fontVariables,
        )}
      >
        <RootProviders defaultTheme="system">{children}</RootProviders>
      </body>
    </html>
  );
}
