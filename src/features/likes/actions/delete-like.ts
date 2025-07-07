"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import { deleteLikeRecipe, getLikeRecipe } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";

export async function deleteLike(recipeId: string, withRedirect: boolean) {
  const session = await getAuthSession();

  if (!session) {
    return errorResponse("Unauthorized");
  }

  const like = await getLikeRecipe(session.user.id, recipeId);

  if (!like) {
    return errorResponse("Like not found");
  }

  if (like.userId !== session.user.id) {
    return errorResponse("Unauthorized");
  }

  try {
    await deleteLikeRecipe(like.userId, recipeId);
  } catch {
    return errorResponse("Failed to delete like");
  }

  revalidatePath(routes.likes);
  return withRedirect ? redirect(routes.likes) : successResponse("Recipe successfully deleted from likes");
}
