import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import type { BadgeProps } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

interface RecipeBadgesProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  category: string;
  area: string;
  size?: BadgeProps["size"];
}

export const RecipeBadges = forwardRef<HTMLDivElement, RecipeBadgesProps>(
  ({ category, area, className, size, ...props }, ref) => {
    return (
      <div className={cn("flex items-center gap-2", className)} ref={ref} {...props}>
        <Badge size={size} variant="info">
          {category}
        </Badge>
        <Badge size={size} variant="danger">
          {area}
        </Badge>
      </div>
    );
  }
);

RecipeBadges.displayName = "RecipeBadges";
