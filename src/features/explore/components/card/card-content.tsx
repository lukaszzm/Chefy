import { RecipeBadges } from "@/components/recipe/recipe-badges";
import { RecipeIngredients } from "@/components/recipe/recipe-ingredients";
import { RecipeSubtitle } from "@/components/recipe/recipe-subtitle";
import { CardContent } from "@/components/ui/card";
import type { Recipe } from "@/types";

interface ExploreCardContentProps extends Pick<Recipe, "ingredients" | "instructions"> {
  areaName: string;
  categoryName: string;
}

export const ExploreCardContent = ({ areaName, categoryName, ingredients, instructions }: ExploreCardContentProps) => {
  return (
    <CardContent className="mt-4 space-y-2">
      <RecipeBadges area={areaName} category={categoryName} />
      <RecipeSubtitle>Ingredients</RecipeSubtitle>
      <RecipeIngredients ingredients={ingredients} />
      <RecipeSubtitle>Instructions</RecipeSubtitle>
      <p>{instructions}</p>
    </CardContent>
  );
};
