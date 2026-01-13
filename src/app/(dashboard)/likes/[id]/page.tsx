import type { Metadata } from "next";

import { Undo2 } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { RecipeBadges } from "@/components/recipe/badges";
import { RecipeIngredients } from "@/components/recipe/ingredients";
import { BackButton } from "@/components/ui/back-button";
import { Block } from "@/components/ui/block";
import { Heading, HeadingTitle } from "@/components/ui/heading";
import { Routes } from "@/config/routes";
import { LikesDropdownMenu } from "@/features/likes/components/dropdown-menu";
import { getLikeRecipe } from "@/lib/db/queries/recipe";
import { getAuthSession } from "@/lib/auth/utils";
import { RecipeLabel } from "@/components/recipe/label";

type LikedRecipePageProps = PageProps<typeof Routes.Like>;

export async function generateMetadata({ params }: LikedRecipePageProps): Promise<Metadata> {
  const session = await getAuthSession();

  if (!session) {
    return redirect(Routes.SignIn);
  }

  const { id: likeId } = await params;
  const like = await getLikeRecipe(session.user.id, likeId);

  if (!like) {
    return notFound();
  }

  return {
    title: `${like.recipe.title} | Chefy`,
  };
}

export default async function LikedRecipePage({ params }: LikedRecipePageProps) {
  const session = await getAuthSession();

  if (!session) {
    return redirect(Routes.SignIn);
  }

  const { id: likeId } = await params;
  const data = await getLikeRecipe(session.user.id, likeId);

  if (!data) {
    return notFound();
  }

  return (
    <>
      <Heading className="flex w-full items-center justify-between">
        <div className="space-y-2">
          <HeadingTitle>{data.recipe.title}</HeadingTitle>
          <RecipeBadges area={data.recipe.area.name} category={data.recipe.category.name} />
        </div>
        <LikesDropdownMenu recipe={data.recipe} deleteWithRedirect />
      </Heading>
      <Block className="flex flex-col">
        <RecipeLabel>Ingredients</RecipeLabel>
        <RecipeIngredients ingredients={data.recipe.ingredients} />
        <RecipeLabel>Instructions</RecipeLabel>
        <p>{data.recipe.instructions}</p>
        <BackButton className="mr-2 self-end">
          <span>Back</span>
          <Undo2 />
        </BackButton>
      </Block>
    </>
  );
}
