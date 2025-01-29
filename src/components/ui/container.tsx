import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/cn";

export const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("container size-full max-w-none space-y-4 px-8 py-4 lg:m-8 lg:max-w-6xl", className)}
      ref={ref}
      {...props}
    />
  );
});

Container.displayName = "Container";
