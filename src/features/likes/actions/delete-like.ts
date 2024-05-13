"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import { validateRequest } from "@/lib/auth";
import { deleteLikeRecipe, getLikeRecipe } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";

export const deleteLike = async (recipeId: string, withRedirect: boolean) => {
  const { user } = await validateRequest();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  const like = await getLikeRecipe(user.id, recipeId);

  if (!like) {
    return errorResponse("Like not found");
  }

  if (like.userId !== user.id) {
    return errorResponse("Unauthorized");
  }

  try {
    await deleteLikeRecipe(like.userId, recipeId);
  } catch (error) {
    return errorResponse("Failed to delete like");
  }

  revalidatePath(routes.likes);
  return withRedirect ? redirect(routes.likes) : successResponse("Recipe successfully deleted from likes");
};
