import { RecipeBadges } from "@/components/recipe/badges";
import { RecipeIngredients } from "@/components/recipe/ingredients";
import { RecipeLabel } from "@/components/recipe/label";
import { CardContent } from "@/components/ui/card";
import type { Recipe } from "@/types";
import { useTranslations } from "next-intl";

interface DiscoverCardContentProps extends Pick<Recipe, "ingredients" | "instructions"> {
  areaName: string;
  categoryName: string;
}

export function DiscoverCardContent({ areaName, categoryName, ingredients, instructions }: DiscoverCardContentProps) {
  const t = useTranslations("discover.card.content");

  return (
    <CardContent className="mt-4 space-y-2">
      <RecipeBadges area={areaName} category={categoryName} />
      <RecipeLabel>{t("ingredients")}</RecipeLabel>
      <RecipeIngredients ingredients={ingredients} />
      <RecipeLabel>{t("instructions")}</RecipeLabel>
      <p>{instructions}</p>
    </CardContent>
  );
}
