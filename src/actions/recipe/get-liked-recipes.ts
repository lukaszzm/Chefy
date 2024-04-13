import { eq, inArray } from "drizzle-orm";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { area, category, recipe, userLikedRecipe } from "@/lib/db/schema";

// TODO: add pagination
export const getLikedRecipes = async () => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const likedRecipes = db
    .select({
      id: userLikedRecipe.recipeId,
    })
    .from(userLikedRecipe)
    .where(eq(userLikedRecipe.userId, user.id));

  return db
    .select()
    .from(recipe)
    .where(inArray(recipe.id, likedRecipes))
    .innerJoin(category, eq(recipe.categoryId, category.id))
    .innerJoin(area, eq(recipe.areaId, area.id))
    .limit(5);
};
