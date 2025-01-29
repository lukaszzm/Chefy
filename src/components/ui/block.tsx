import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/cn";

export const Block = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("lg:border-border bg-popover space-y-4 rounded-md p-3 lg:rounded-sm lg:border lg:p-6", className)}
      ref={ref}
      {...props}
    />
  );
});

Block.displayName = "Block";
