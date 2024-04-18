"use server";

import { and, eq } from "drizzle-orm";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { userLikedRecipe } from "@/lib/db/schema";
import { errorResponse, successResponse } from "@/utils/action-response";

export const deleteLike = async (recipeId: string) => {
  const { user } = await validateRequest();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  const like = await db.query.userLikedRecipe.findFirst({
    where: eq(userLikedRecipe.userId, user.id),
  });

  if (!like) {
    return errorResponse("Like not found");
  }

  if (like.userId !== user.id) {
    return errorResponse("Unauthorized");
  }

  await db
    .delete(userLikedRecipe)
    .where(and(eq(userLikedRecipe.userId, user.id), eq(userLikedRecipe.recipeId, recipeId)));

  return successResponse("Like successfully deleted");
};
