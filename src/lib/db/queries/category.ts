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

export const deletePreferredCategories = async (userId: string) =>
  db.delete(userPreferredCategoryTable).where(eq(userPreferredCategoryTable.userId, userId));

export const createPreferredCategory = async (userId: string, categoryId: string) =>
  db.insert(userPreferredCategoryTable).values({
    userId,
    categoryId,
  });

export const updatePreferredCategories = async (userId: string, categories: string[]) =>
  db.transaction(async () => {
    await deletePreferredCategories(userId);

    for (const categoryId of categories) {
      await createPreferredCategory(userId, categoryId);
    }
  });
