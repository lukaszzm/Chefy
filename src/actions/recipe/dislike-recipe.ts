"use server";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { userDislikedRecipe } from "@/lib/db/schema";

export const dislikeRecipe = async (recipeId: string) => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await db.insert(userDislikedRecipe).values({
    userId: user.id,
    recipeId: recipeId,
  });
};
