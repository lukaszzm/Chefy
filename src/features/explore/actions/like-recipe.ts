"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
import { createLikeRecipe } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";

export async function likeRecipe(recipeId: string) {
  const session = await getAuthSession();

  if (!session) {
    return errorResponse("Unauthorized");
  }

  try {
    await createLikeRecipe(session.user.id, recipeId);
  } catch {
    return errorResponse("Failed to like recipe");
  }

  revalidatePath(routes.explore);
  revalidatePath(routes.likes);
  return successResponse("Recipe liked");
}
