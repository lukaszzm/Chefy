import { and, asc, count, eq, inArray, notInArray, sql } from "drizzle-orm";

import db from "@/lib/db";
import {
  areaTable,
  categoryTable,
  recipeTable,
  userDislikedRecipeTable,
  userLikedRecipeTable,
  userPreferredAreaTable,
  userPreferredCategoryTable,
} from "@/lib/db/schema";
import { withPagination } from "@/utils/with-pagination";
import { cache } from "react";

export const getLikedRecipes = cache(async (userId: string, page = 1, pageSize = 5) => {
  const likesQuery = db
    .select({
      id: userLikedRecipeTable.recipeId,
    })
    .from(userLikedRecipeTable)
    .where(eq(userLikedRecipeTable.userId, userId));

  const metaQuery = db
    .select({
      count: count(),
    })
    .from(recipeTable)
    .where(inArray(recipeTable.id, likesQuery));

  const likedRecipesQuery = db
    .select()
    .from(recipeTable)
    .where(inArray(recipeTable.id, likesQuery))
    .innerJoin(categoryTable, eq(recipeTable.categoryId, categoryTable.id))
    .innerJoin(areaTable, eq(recipeTable.areaId, areaTable.id));

  const [meta, paginatedResult] = await Promise.all([
    metaQuery,
    withPagination(likedRecipesQuery.$dynamic(), asc(recipeTable.id), page, pageSize),
  ]);

  return {
    recipes: paginatedResult,
    pageCount: Math.ceil(meta[0].count / pageSize),
  };
});

export const getSuggestedRecipes = cache(async (userId: string) => {
  const preferredAreas = db
    .select({
      areaId: userPreferredAreaTable.areaId,
    })
    .from(userPreferredAreaTable)
    .where(eq(userPreferredAreaTable.userId, userId));

  const preferredCategories = db
    .select({
      categoryId: userPreferredCategoryTable.categoryId,
    })
    .from(userPreferredCategoryTable)
    .where(eq(userPreferredCategoryTable.userId, userId));

  const likedRecipes = db
    .select({
      id: userLikedRecipeTable.recipeId,
    })
    .from(userLikedRecipeTable)
    .where(eq(userLikedRecipeTable.userId, userId));

  const dislikedRecipes = db
    .select({
      id: userDislikedRecipeTable.recipeId,
    })
    .from(userDislikedRecipeTable)
    .where(eq(userDislikedRecipeTable.userId, userId));

  return await db
    .select()
    .from(recipeTable)
    .where(
      and(
        notInArray(recipeTable.id, likedRecipes),
        notInArray(recipeTable.id, dislikedRecipes),
        inArray(recipeTable.areaId, preferredAreas),
        inArray(recipeTable.categoryId, preferredCategories)
      )
    )
    .innerJoin(categoryTable, eq(recipeTable.categoryId, categoryTable.id))
    .innerJoin(areaTable, eq(recipeTable.areaId, areaTable.id))
    .orderBy(sql`RANDOM()`)
    .limit(10);
});

export const getLikeRecipe = cache(async (userId: string, recipeId: string) =>
  db.query.userLikedRecipeTable.findFirst({
    where: and(eq(userLikedRecipeTable.recipeId, recipeId), eq(userLikedRecipeTable.userId, userId)),
    with: {
      recipe: {
        with: {
          category: true,
          area: true,
        },
      },
    },
  })
);

export const getFirstRecipe = cache(async () => db.query.recipeTable.findFirst());

export const createDislikeRecipe = async (userId: string, recipeId: string) =>
  db.insert(userDislikedRecipeTable).values({
    userId,
    recipeId,
  });

export const createLikeRecipe = async (userId: string, recipeId: string) =>
  db.insert(userLikedRecipeTable).values({
    userId,
    recipeId,
  });

export const deleteLikeRecipe = async (userId: string, recipeId: string) =>
  db
    .delete(userLikedRecipeTable)
    .where(and(eq(userLikedRecipeTable.userId, userId), eq(userLikedRecipeTable.recipeId, recipeId)));
