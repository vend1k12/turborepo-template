"use client";
import { useKBar } from "kbar";
import { Icons } from "./icons";
import { Button } from "./ui/button";

export default function CommandPaletteTrigger() {
  const { query } = useKBar();

  return (
    <Button
      variant="outline"
      className="text-muted-foreground flex w-full items-center justify-between gap-4 px-3 py-2 text-sm"
      onClick={query.toggle}
    >
      <div className="flex items-center gap-2">
        <Icons.search className="size-4" />
        <span>Search...</span>
      </div>
      <kbd className="bg-muted border flex h-5 items-center gap-1 rounded-sm px-1.5 font-mono text-[10px] font-medium">
        <Icons.command className="size-3" />K
      </kbd>
    </Button>
  );
}
