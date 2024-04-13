import React from "react";

import { cn } from "@/utils/cn";

export const Title = React.forwardRef<HTMLInputElement, React.ButtonHTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return <h1 className={cn("text-xl font-semibold text-muted-foreground", className)} ref={ref} {...props} />;
  }
);

Title.displayName = "Title";
