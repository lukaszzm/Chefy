"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
import { createDislikeRecipe } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getCurrentSession } from "@/lib/auth/session";

export const dislikeRecipe = async (recipeId: string) => {
  const { user } = await getCurrentSession();

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
