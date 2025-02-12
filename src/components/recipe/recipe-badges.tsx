import type { BadgeProps } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

interface RecipeBadgesProps extends Omit<React.ComponentProps<"div">, "children"> {
  category: string;
  area: string;
  size?: BadgeProps["size"];
}

export function RecipeBadges({ category, area, className, size, ...props }: RecipeBadgesProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Badge size={size} variant="info">
        {category}
      </Badge>
      <Badge size={size} variant="danger">
        {area}
      </Badge>
    </div>
  );
}
