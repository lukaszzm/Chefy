"use server";

import { eq } from "drizzle-orm";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { userPreferredCategory } from "@/lib/db/schema";
import { errorResponse, successResponse } from "@/utils/action-response";

export const updatePreferredCategories = async (categories: string[]) => {
  const { user } = await validateRequest();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  try {
    await db.transaction(async (transaction) => {
      await db.delete(userPreferredCategory).where(eq(userPreferredCategory.userId, user.id));

      for (const category of categories) {
        await transaction.insert(userPreferredCategory).values({
          userId: user.id,
          categoryId: category,
        });
      }
    });
  } catch (e) {
    return errorResponse("Failed to update preferred categories");
  }

  return successResponse("Preferred categories updated");
};
