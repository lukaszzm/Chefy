import { CircleEllipsis } from "lucide-react";

import { RecipeBadges } from "@/components/recipe/recipe-badges";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/types";

interface LikesItemProps extends Recipe {
  category: string;
  area: string;
}

export const LikesItem = ({ title, category, area }: LikesItemProps) => {
  return (
    <li className="flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3">
      <div className="flex-1 space-y-1">
        <h2 className="font-medium">{title}</h2>
        <RecipeBadges area={area} category={category} size="xs" />
      </div>
      <div className="flex gap-1 text-muted-foreground">
        {/* TODO: Add dialog to show details */}
        <Button size="icon" variant="ghost">
          <CircleEllipsis />
        </Button>
      </div>
    </li>
  );
};
