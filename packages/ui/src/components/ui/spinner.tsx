import { Icons } from "../icons";

import { cn } from "../../lib/utils";

function Spinner({ className }: { className?: string }) {
  return (
    <Icons.spinner
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
    />
  );
}

export { Spinner };
