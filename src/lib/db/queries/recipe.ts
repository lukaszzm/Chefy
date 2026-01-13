import { cache } from "react";

import { and, asc, count, eq, inArray, notInArray } from "drizzle-orm";

import db from "@/lib/db";
import {
  area,
  category,
  recipe,
  userDislikedRecipe,
  userLikedRecipe,
  userPreferredArea,
  userPreferredCategory,
} from "@/lib/db/schema";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, withCursorPagination, withSimplePagination } from "@/utils/pagination";

export const getLikedRecipes = cache(async (userId: string, page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE) => {
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
    withSimplePagination(likedRecipesQuery.$dynamic(), asc(recipe.id), page, pageSize),
  ]);

  return {
    recipes: paginatedResult,
    pageCount: Math.ceil(meta[0].count / pageSize),
  };
});

export const getPersonalizedRecipes = cache(async (userId: string, cursor?: string, excludeIds?: string[]) => {
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
    .where(eq(userLikedRecipe.userId, userId));

  const dislikedRecipes = db
    .select({
      id: userDislikedRecipe.recipeId,
    })
    .from(userDislikedRecipe)
    .where(eq(userDislikedRecipe.userId, userId));

  const whereConditions = [
    notInArray(recipe.id, likedRecipes),
    notInArray(recipe.id, dislikedRecipes),
    inArray(recipe.areaId, preferredAreas),
    inArray(recipe.categoryId, preferredCategories),
  ];

  if (excludeIds && excludeIds.length > 0) {
    whereConditions.push(notInArray(recipe.id, excludeIds));
  }

  const suggestedRecipesQuery = db
    .select()
    .from(recipe)
    .where(and(...whereConditions))
    .innerJoin(category, eq(recipe.categoryId, category.id))
    .innerJoin(area, eq(recipe.areaId, area.id));

  const cursorPaginationQuery = await withCursorPagination(suggestedRecipesQuery.$dynamic(), recipe.id, cursor, 10);

  console.log("Cursor Pagination Query:", cursorPaginationQuery);

  return cursorPaginationQuery;
});

export const getLikeRecipe = cache(async (userId: string, recipeId: string) =>
  db.query.userLikedRecipe.findFirst({
    where: and(eq(userLikedRecipe.recipeId, recipeId), eq(userLikedRecipe.userId, userId)),
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

export const getFirstRecipe = cache(async () => db.query.recipe.findFirst());

export async function createDislikeRecipe(userId: string, recipeId: string) {
  return db.insert(userDislikedRecipe).values({
    userId,
    recipeId,
  });
}

export async function createLikeRecipe(userId: string, recipeId: string) {
  return db.insert(userLikedRecipe).values({
    userId,
    recipeId,
  });
}

export async function deleteLikeRecipe(userId: string, recipeId: string) {
  return db
    .delete(userLikedRecipe)
    .where(and(eq(userLikedRecipe.userId, userId), eq(userLikedRecipe.recipeId, recipeId)));
}
