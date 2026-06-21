import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import ThemeProvider from "@vend1k/ui/components/themes/theme-provider";
import { fontVariables } from "@vend1k/ui/components/themes/font.config";
import { cn } from "@vend1k/ui/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "vend1k personal docs",
    template: "%s — vend1k personal docs",
  },
  description:
    "Architecture, API, auth, deployment, and example documentation for vend1k personal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="en" data-theme="claude" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen flex-col antialiased bg-background text-foreground font-sans",
          fontVariables
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
