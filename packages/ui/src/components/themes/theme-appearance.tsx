"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Icons } from "../icons";

const OPTIONS = [
  { value: "light", label: "Light", icon: Icons.sun },
  { value: "dark", label: "Dark", icon: Icons.moon },
  { value: "system", label: "System", icon: Icons.laptop },
] as const;

/**
 * Segmented Light / Dark / System theme selector backed by next-themes.
 * Safe against hydration mismatch (renders the control only after mount).
 */
export function ThemeAppearance({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={mounted ? theme : undefined}
      onValueChange={(value) => {
        if (value) setTheme(value);
      }}
      className={className}
      aria-label="Theme appearance"
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => (
        <ToggleGroupItem key={value} value={value} aria-label={label}>
          <Icon className="size-4" />
          <span>{label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
