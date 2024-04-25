"use server";

import { validateRequest } from "@/lib/auth";
import { deleteLikeRecipe, getLikeRecipeById } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";

export const deleteLike = async (recipeId: string) => {
  const { user } = await validateRequest();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  const like = await getLikeRecipeById(recipeId);

  if (!like) {
    return errorResponse("Like not found");
  }

  if (like.userId !== user.id) {
    return errorResponse("Unauthorized");
  }

  try {
    await deleteLikeRecipe(like.userId, recipeId);
    return successResponse("Like successfully deleted");
  } catch (error) {
    return errorResponse("Failed to delete like");
  }
};
