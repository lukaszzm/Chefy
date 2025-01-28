"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
import { getCurrentSession } from "@/lib/auth/session";
import { createLikeRecipe } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";

export const likeRecipe = async (recipeId: string) => {
  const { user } = await getCurrentSession();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  try {
    await createLikeRecipe(user.id, recipeId);
  } catch {
    return errorResponse("Failed to like recipe");
  }

  revalidatePath(routes.explore);
  revalidatePath(routes.likes);
  return successResponse("Recipe liked");
};
