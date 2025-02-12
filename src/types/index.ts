import type { InferSelectModel } from "drizzle-orm";

import type { areaTable, categoryTable, recipeTable, sessionTable, userTable } from "@/lib/db/schema";

export type Recipe = InferSelectModel<typeof recipeTable>;

export type Area = InferSelectModel<typeof areaTable>;

export type Category = InferSelectModel<typeof categoryTable>;

export type User = InferSelectModel<typeof userTable>;

export type SafeUser = Omit<User, "password">;

export type Session = InferSelectModel<typeof sessionTable>;

export type SessionValidationResult = { session: Session; user: SafeUser } | { session: null; user: null };

export interface RecipeWithRelations {
  recipe: Recipe;
  category: Category;
  area: Area;
}

export interface ActionError {
  ok: false;
  error: string;
}

export interface ActionSuccess<T> {
  ok: true;
  data: T;
}

export type ActionResponse<T> = ActionError | ActionSuccess<T>;
