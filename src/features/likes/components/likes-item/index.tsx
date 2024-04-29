import { RecipeBadges } from "@/components/recipe/recipe-badges";
import { LikesItemDropdownMenu } from "@/features/likes/components/likes-item/dropdown-menu";
import type { RecipeWithRelations } from "@/types";

interface LikesItemProps extends RecipeWithRelations {}

export const LikesItem = ({ recipe, area, category }: LikesItemProps) => {
  return (
    <li className="flex items-center gap-2 rounded-md border border-border bg-background/40 px-6 py-3 has-[[data-pending]]:animate-pulse">
      <div className="flex-1 space-y-1">
        <h2 className="font-medium">{recipe.title}</h2>
        <RecipeBadges area={area.name} category={category.name} size="xs" />
      </div>

      <LikesItemDropdownMenu {...recipe} />
    </li>
  );
};
