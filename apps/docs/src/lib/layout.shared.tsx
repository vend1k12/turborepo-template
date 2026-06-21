import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ThemeModeToggle } from "@vend1k/ui/components/themes/theme-mode-toggle";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="font-bold tracking-tight">vend1k personal</span>
      ),
      url: "/docs",
    },
    // Reuse the @vend1k/ui mode toggle instead of Fumadocs' built-in switch.
    themeSwitch: { enabled: false },
    links: [
      {
        type: "custom",
        secondary: true,
        children: <ThemeModeToggle />,
      },
    ],
  };
}
