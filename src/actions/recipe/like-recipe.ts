"use server";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { userLikedRecipe } from "@/lib/db/schema";

export const likeRecipe = async (recipeId: string) => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await db.insert(userLikedRecipe).values({
    userId: user.id,
    recipeId,
  });
};
