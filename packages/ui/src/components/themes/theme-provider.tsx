"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

// next-themes (0.4.6, unmaintained) injects its anti-FOUC <script> via
// React.createElement, which React 19 + Next 16.2 flag with a noisy dev error
// ("Encountered a script tag while rendering React component"). The script is
// server-rendered and runs correctly — the warning is a false positive — but
// Next 16.2 surfaces it in the dev overlay and terminal on every page. Drop
// only that one message in development; everything else passes through.
if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development" &&
  !(console as { __nextThemesScriptPatched?: boolean }).__nextThemesScriptPatched
) {
  const original = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag")
    ) {
      return;
    }
    original.apply(console, args as Parameters<typeof console.error>);
  };
  (console as { __nextThemesScriptPatched?: boolean }).__nextThemesScriptPatched =
    true;
}

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
