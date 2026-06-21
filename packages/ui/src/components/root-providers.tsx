"use client";

import type * as React from "react";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ThemeProvider from "./themes/theme-provider";
import { QueryProvider } from "./query-provider";
import { Toaster } from "./ui/sonner";

export interface RootProvidersProps {
  children: React.ReactNode;
  /** next-themes default theme. Default: "system". */
  defaultTheme?: string;
}

/**
 * The shared root provider chain mounted by every dashboard app's root layout:
 * top-loading bar, nuqs URL-state adapter, next-themes provider, React Query
 * client, and the toast portal. App-specific <html>/<body> wiring (data-theme,
 * fonts, meta theme-color) stays in each app's layout.
 */
export function RootProviders({
  children,
  defaultTheme = "system",
}: RootProvidersProps) {
  return (
    <>
      <NextTopLoader color="var(--primary)" showSpinner={false} />
      <NuqsAdapter>
        <ThemeProvider
          attribute="class"
          defaultTheme={defaultTheme}
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </NuqsAdapter>
    </>
  );
}
