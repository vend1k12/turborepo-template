import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@vend1k/ui/globals.css";
import ThemeProvider from "@vend1k/ui/components/themes/theme-provider";
import { fontVariables } from "@vend1k/ui/components/themes/font.config";
import { cn } from "@vend1k/ui/lib/utils";

export const metadata: Metadata = {
  title: "vend1k personal",
  description:
    "Private Next.js, Hono, Better Auth, and Drizzle Turborepo template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="en" data-theme="claude" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background text-foreground font-sans antialiased", fontVariables)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
