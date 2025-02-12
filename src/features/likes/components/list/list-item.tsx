import { RecipeBadges } from "@/components/recipe/recipe-badges";
import { LikesDropdownMenu } from "@/features/likes/components/dropdown-menu";
import type { Area, Category, Recipe } from "@/types";

interface LikesListItemProps {
  recipe: Recipe;
  area: Area;
  category: Category;
}

export function LikesListItem({ recipe, area, category }: LikesListItemProps) {
  return (
    <li className="border-border bg-background/40 flex items-center gap-2 rounded-md border px-6 py-3 has-data-pending:animate-pulse">
      <div className="flex-1 space-y-1">
        <h2 className="font-medium">{recipe.title}</h2>
        <RecipeBadges area={area.name} category={category.name} size="xs" />
      </div>

      <LikesDropdownMenu recipe={recipe} withDetailsLink />
    </li>
  );
}
