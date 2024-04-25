import { and, asc, count, eq, inArray, notInArray } from "drizzle-orm";

import db from "@/lib/db";
import {
  area,
  category,
  recipe,
  user,
  userDislikedRecipe,
  userLikedRecipe,
  userPreferredArea,
  userPreferredCategory,
} from "@/lib/db/schema";
import { withPagination } from "@/utils/with-pagination";

export const getLikedRecipes = async (userId: string, page = 1, pageSize = 5) => {
  const likesQuery = db
    .select({
      id: userLikedRecipe.recipeId,
    })
    .from(userLikedRecipe)
    .where(eq(userLikedRecipe.userId, userId));

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

export const getSuggestedRecipes = async (userId: string) => {
  const preferredAreas = db
    .select({
      areaId: userPreferredArea.areaId,
    })
    .from(userPreferredArea)
    .where(eq(userPreferredArea.userId, userId));

  const preferredCategories = db
    .select({
      categoryId: userPreferredCategory.categoryId,
    })
    .from(userPreferredCategory)
    .where(eq(userPreferredCategory.userId, userId));

  const likedRecipes = db
    .select({
      id: userLikedRecipe.recipeId,
    })
    .from(userLikedRecipe)
    .where(eq(userLikedRecipe.userId, user.id));

  const dislikedRecipes = db
    .select({
      id: userDislikedRecipe.recipeId,
    })
    .from(userDislikedRecipe)
    .where(eq(userDislikedRecipe.userId, user.id));

  return await db
    .select()
    .from(recipe)
    .where(
      and(
        notInArray(recipe.id, likedRecipes),
        notInArray(recipe.id, dislikedRecipes),
        inArray(recipe.areaId, preferredAreas),
        inArray(recipe.categoryId, preferredCategories)
      )
    )
    .innerJoin(category, eq(recipe.categoryId, category.id))
    .innerJoin(area, eq(recipe.areaId, area.id))
    .limit(10);
};

export const createDislikeRecipe = async (userId: string, recipeId: string) =>
  db.insert(userDislikedRecipe).values({
    userId,
    recipeId,
  });

export const createLikeRecipe = async (userId: string, recipeId: string) =>
  db.insert(userLikedRecipe).values({
    userId,
    recipeId,
  });

export const getLikeRecipeById = async (recipeId: string) =>
  db.query.userLikedRecipe.findFirst({
    where: eq(userLikedRecipe.recipeId, recipeId),
  });

export const deleteLikeRecipe = async (userId: string, recipeId: string) =>
  db.delete(userLikedRecipe).where(and(eq(userLikedRecipe.userId, userId), eq(userLikedRecipe.recipeId, recipeId)));
