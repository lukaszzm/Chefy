import { asc, count, eq, inArray } from "drizzle-orm";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { area, category, recipe, userLikedRecipe } from "@/lib/db/schema";
import { withPagination } from "@/utils/with-pagination";

export const getLikedRecipes = async (page = 1, pageSize = 5) => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const likesQuery = db
    .select({
      id: userLikedRecipe.recipeId,
    })
    .from(userLikedRecipe)
    .where(eq(userLikedRecipe.userId, user.id));

  const metaQuery = db
    .select({
      count: count(),
    })
    .from(recipe)
    .where(inArray(recipe.id, likesQuery));

  const likedRecipesQuery = db
    .select()
    .from(recipe)
    .where(inArray(recipe.id, likesQuery))
    .innerJoin(category, eq(recipe.categoryId, category.id))
    .innerJoin(area, eq(recipe.areaId, area.id));

  const [meta, paginatedResult] = await Promise.all([
    metaQuery,
    withPagination(likedRecipesQuery.$dynamic(), asc(recipe.id), page, pageSize),
  ]);

  return {
    recipes: paginatedResult,
    pageCount: Math.ceil(meta[0].count / pageSize),
  };
};
