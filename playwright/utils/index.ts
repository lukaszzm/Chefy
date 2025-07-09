import { createLikeRecipe, deleteLikeRecipe, getFirstRecipe } from "@/lib/db/queries/recipe";
import { Recipe } from "@/types";

export async function createTestLike(userId: string): Promise<Recipe> {
  const recipe = await getFirstRecipe();

  if (!recipe) {
    throw new Error("No recipes found to like, ensure there are recipes in the database");
  }

  await createLikeRecipe(userId, recipe.id);
  return recipe;
}

export async function removeTestLike(userId: string, recipeId: string) {
  return deleteLikeRecipe(userId, recipeId);
}
