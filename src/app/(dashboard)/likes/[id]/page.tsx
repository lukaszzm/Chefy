import type { Metadata } from "next";

import { redirect } from "next/navigation";

import { RecipeBadges } from "@/components/recipe/recipe-badges";
import { RecipeIngredients } from "@/components/recipe/recipe-ingredients";
import { RecipeSubtitle } from "@/components/recipe/recipe-subtitle";
import { Title } from "@/components/ui/title";
import { routes } from "@/config/routes";
import { LikesDropdownMenu } from "@/features/likes";
import { getLikeRecipeById } from "@/lib/db/queries/recipe";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const data = await getLikeRecipeById(id);

  return {
    title: data?.recipe.title ?? "Recipe not found",
  };
}
export default async function LikePage({ params: { id } }: PageProps) {
  const data = await getLikeRecipeById(id);

  if (!data) {
    return redirect(routes.likes);
  }

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="space-y-2">
          <Title>{data.recipe.title}</Title>
          <RecipeBadges area={data.recipe.area.name} category={data.recipe.category.name} />
        </div>
        <LikesDropdownMenu recipe={data.recipe} deleteWithRedirect />
      </div>
      <div className="space-y-4">
        <RecipeSubtitle>Ingredients</RecipeSubtitle>
        <RecipeIngredients ingredients={data.recipe.ingredients} />
        <RecipeSubtitle>Instructions</RecipeSubtitle>
        <p>{data.recipe.instructions}</p>
      </div>
    </>
  );
}
