import { cache } from "react";

import { eq, inArray } from "drizzle-orm";

import db from "@/lib/db";
import { category, userPreferredCategory } from "@/lib/db/schema";

export const getAllCategories = cache(async () => db.query.category.findMany());

export const getPreferredCategories = cache((userId: string) =>
  db.query.category.findMany({
    where: inArray(
      category.id,
      db
        .select({
          id: userPreferredCategory.categoryId,
        })
        .from(userPreferredCategory)
        .where(eq(userPreferredCategory.userId, userId))
    ),
  })
);

export async function deletePreferredCategories(userId: string) {
  return db.delete(userPreferredCategory).where(eq(userPreferredCategory.userId, userId));
}

export async function createPreferredCategory(userId: string, categoryId: string) {
  return db.insert(userPreferredCategory).values({
    userId,
    categoryId,
  });
}

export async function updatePreferredCategories(userId: string, categories: string[]) {
  return db.transaction(async () => {
    await deletePreferredCategories(userId);

    for (const categoryId of categories) {
      await createPreferredCategory(userId, categoryId);
    }
  });
}
