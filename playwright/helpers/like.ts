import { createLikeRecipe, deleteLikeRecipe, getFirstRecipe } from "@/lib/db/queries/recipe";

async function create(userId: string) {
  const recipe = await getFirstRecipe();

  if (!recipe) {
    throw new Error("Data not found");
  }

  await createLikeRecipe(userId, recipe.id);

  return recipe;
}

async function clean(userId: string, recipeId: string) {
  await deleteLikeRecipe(userId, recipeId);
}

export const like = {
  create,
  clean,
};
