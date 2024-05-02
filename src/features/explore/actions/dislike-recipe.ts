"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
import { validateRequest } from "@/lib/auth";
import { createDislikeRecipe } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";

export const dislikeRecipe = async (recipeId: string) => {
  const { user } = await validateRequest();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  try {
    await createDislikeRecipe(user.id, recipeId);
  } catch (error) {
    return errorResponse("Failed to dislike recipe");
  }

  revalidatePath(routes.explore);
  return successResponse("Recipe disliked");
};
