import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

interface RecipeBadgesProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  category: string;
  area: string;
}

export const RecipeBadges = forwardRef<HTMLDivElement, RecipeBadgesProps>(
  ({ category, area, className, ...props }, ref) => {
    return (
      <div className={cn("flex items-center gap-2", className)} ref={ref} {...props}>
        <Badge className="bg-blue-500/90 hover:bg-blue-500">{category}</Badge>
        <Badge className="bg-orange-500/90 hover:bg-orange-500">{area}</Badge>
      </div>
    );
  }
);

RecipeBadges.displayName = "RecipeBadges";
