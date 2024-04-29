import { forwardRef } from "react";

import { cn } from "@/utils/cn";

export const RecipeLabel = forwardRef<HTMLParagraphElement, React.HTMLProps<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return <p className={cn("font-semibold", className)} ref={ref} {...props} />;
  }
);

RecipeLabel.displayName = "RecipeLabel";
