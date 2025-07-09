"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
import { createDislikeRecipe } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";

export async function dislikeRecipe(recipeId: string) {
  const session = await getAuthSession();

  if (!session) {
    return errorResponse("Unauthorized");
  }

  try {
    await createDislikeRecipe(session.user.id, recipeId);
  } catch {
    return errorResponse("Failed to dislike recipe");
  }

  revalidatePath(routes.explore);
  return successResponse("Recipe disliked");
}
