import type { account, area, category, recipe, session, user } from "@/lib/db/schema";

export type Recipe = typeof recipe.$inferSelect;
export type RecipePayload = typeof recipe.$inferInsert;

export type Area = typeof area.$inferSelect;
export type AreaPayload = typeof area.$inferInsert;

export type Category = typeof category.$inferSelect;
export type CategoryPayload = typeof category.$inferInsert;

export type User = typeof user.$inferSelect;
export type UserPayload = typeof user.$inferInsert;

export type SafeUser = Omit<User, "password">;

export type Session = typeof session.$inferSelect;
export type SessionPayload = typeof session.$inferInsert;

export type Account = typeof account.$inferSelect;
export type AccountPayload = typeof account.$inferInsert;

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

export type ActionResponse<T = unknown> = ActionError | ActionSuccess<T>;
