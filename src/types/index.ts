import type { InferSelectModel } from "drizzle-orm";

import type { areaTable, categoryTable, recipeTable, sessionTable, userTable } from "@/lib/db/schema";

export type Recipe = InferSelectModel<typeof recipeTable>;

export type Area = InferSelectModel<typeof areaTable>;

export type Category = InferSelectModel<typeof categoryTable>;

export type User = InferSelectModel<typeof userTable>;

export type SafeUser = Omit<User, "password">;

export type Session = InferSelectModel<typeof sessionTable>;

export type SessionValidationResult = { session: Session; user: SafeUser } | { session: null; user: null };

export type RecipeWithRelations = {
  recipe: Recipe;
  category: Category;
  area: Area;
};

export type ActionError = {
  ok: false;
  error: string;
};

export type ActionSuccess<T> = {
  ok: true;
  data: T;
};

export type ActionResponse<T> = ActionError | ActionSuccess<T>;
