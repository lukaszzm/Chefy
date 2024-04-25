import type { InferSelectModel } from "drizzle-orm";

import type { area, category, recipe, user } from "@/lib/db/schema";

export type Recipe = InferSelectModel<typeof recipe>;

export type Area = InferSelectModel<typeof area>;

export type Category = InferSelectModel<typeof category>;

export type User = InferSelectModel<typeof user>;

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
