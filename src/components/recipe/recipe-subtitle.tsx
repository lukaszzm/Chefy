import { forwardRef } from "react";

import { cn } from "@/utils/cn";

export const RecipeSubtitle = forwardRef<HTMLHeadingElement, React.HTMLProps<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return <h4 className={cn("font-semibold", className)} ref={ref} {...props} />;
  }
);

RecipeSubtitle.displayName = "RecipeSubtitle";
