"use server";

import { validateRequest } from "@/lib/auth";
import { createLikeRecipe } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";

export const likeRecipe = async (recipeId: string) => {
  const { user } = await validateRequest();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  try {
    await createLikeRecipe(user.id, recipeId);
    return successResponse("Recipe liked");
  } catch (error) {
    return errorResponse("Failed to like recipe");
  }
};
