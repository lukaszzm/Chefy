import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/cn";

const Heading = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div className={cn("w-full space-y-2 py-1 pt-2 lg:py-3 lg:pt-6", className)} ref={ref} {...props} />;
});
Heading.displayName = "Heading";

const HeadingTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <h1 className={cn("text-3xl font-semibold", className)} ref={ref} {...props} />;
});
HeadingTitle.displayName = "HeadingTitle";

export { Heading, HeadingTitle };
