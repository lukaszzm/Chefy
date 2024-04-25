import { eq, inArray } from "drizzle-orm";

import db from "@/lib/db";
import { category, userPreferredCategory } from "@/lib/db/schema";

export const getAllCategories = () => db.query.category.findMany();

export const getPreferredCategories = (userId: string) =>
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
  });

export const deletePreferredCategories = async (userId: string) =>
  db.delete(userPreferredCategory).where(eq(userPreferredCategory.userId, userId));

export const createPreferredCategory = async (userId: string, categoryId: string) =>
  db.insert(userPreferredCategory).values({
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
