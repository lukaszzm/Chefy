import { cache } from "react";

import { eq, inArray } from "drizzle-orm";

import db from "@/lib/db";
import { categoryTable, userPreferredCategoryTable } from "@/lib/db/schema";

export const getAllCategories = cache(async () => db.query.categoryTable.findMany());

export const getPreferredCategories = cache((userId: string) =>
  db.query.categoryTable.findMany({
    where: inArray(
      categoryTable.id,
      db
        .select({
          id: userPreferredCategoryTable.categoryId,
        })
        .from(userPreferredCategoryTable)
        .where(eq(userPreferredCategoryTable.userId, userId))
    ),
  })
);

export async function deletePreferredCategories(userId: string) {
  return db.delete(userPreferredCategoryTable).where(eq(userPreferredCategoryTable.userId, userId));
}

export async function createPreferredCategory(userId: string, categoryId: string) {
  return db.insert(userPreferredCategoryTable).values({
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
