import { eq } from "drizzle-orm";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { userPreferredCategory } from "@/lib/db/schema";

export const getPreferredCategories = async () => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const categories = await db.query.userPreferredCategory.findMany({
    where: eq(userPreferredCategory.userId, user.id),
    columns: {
      categoryId: true,
    },
    with: {
      category: true,
    },
  });

  return categories.map(({ category }) => category);
};
