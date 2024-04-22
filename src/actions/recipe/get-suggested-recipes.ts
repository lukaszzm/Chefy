"use server";

import { notInArray, and, eq, inArray } from "drizzle-orm";

import { validateRequest } from "@/lib/auth";
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
import type { SuggestedRecipe } from "@/types";

export const getSuggestedRecipes = async (): Promise<Array<SuggestedRecipe>> => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const preferredAreas = db
    .select({
      areaId: userPreferredArea.areaId,
    })
    .from(userPreferredArea)
    .where(eq(userPreferredArea.userId, user.id));

  const preferredCategories = db
    .select({
      categoryId: userPreferredCategory.categoryId,
    })
    .from(userPreferredCategory)
    .where(eq(userPreferredCategory.userId, user.id));

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

  const suggestions = await db
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

  return suggestions;
};
