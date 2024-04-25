import { RecipeBadges } from "@/components/recipe/recipe-badges";
import { LikesItemDropdownMenu } from "@/features/likes/components/likes-item/dropdown-menu";
import type { Recipe } from "@/types";

interface LikesItemProps extends Recipe {
  category: string;
  area: string;
}

export const LikesItem = ({ title, category, area, ...props }: LikesItemProps) => {
  return (
    <li className="flex items-center gap-2 rounded-md border border-border bg-background/40 px-6 py-3">
      <div className="flex-1 space-y-1">
        <h2 className="font-medium">{title}</h2>
        <RecipeBadges area={area} category={category} size="xs" />
      </div>
      <LikesItemDropdownMenu title={title} {...props} />
    </li>
  );
};
