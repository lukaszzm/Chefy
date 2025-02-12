import { RecipeBadges } from "@/components/recipe/recipe-badges";
import { RecipeIngredients } from "@/components/recipe/recipe-ingredients";
import { RecipeLabel } from "@/components/recipe/recipe-label";
import { CardContent } from "@/components/ui/card";
import type { Recipe } from "@/types";

interface ExploreCardContentProps extends Pick<Recipe, "ingredients" | "instructions"> {
  areaName: string;
  categoryName: string;
}

export function ExploreCardContent({ areaName, categoryName, ingredients, instructions }: ExploreCardContentProps) {
  return (
    <CardContent className="mt-4 space-y-2">
      <RecipeBadges area={areaName} category={categoryName} />
      <RecipeLabel>Ingredients</RecipeLabel>
      <RecipeIngredients ingredients={ingredients} />
      <RecipeLabel>Instructions</RecipeLabel>
      <p>{instructions}</p>
    </CardContent>
  );
}
