import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  likedRecipes: many(userLikedRecipe),
  dislikedRecipes: many(userDislikedRecipe),
  preferredCategories: many(userPreferredCategory),
  preferredAreas: many(userPreferredArea),
}));

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const category = pgTable("category", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  preferredBy: many(userPreferredCategory),
  recipes: many(recipe),
}));

export const area = pgTable("area", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const areaRelations = relations(area, ({ many }) => ({
  preferredBy: many(userPreferredArea),
  recipes: many(recipe),
}));

export const recipe = pgTable("recipe", {
  id: text("id").primaryKey(),
  imageSrc: text("image_src").notNull(),
  title: text("title").notNull(),
  categoryId: text("category_id").notNull(),
  areaId: text("area_id").notNull(),
  instructions: text("instructions").notNull(),
  ingredients: text("ingredients").array().notNull(),
});

export const recipeRelations = relations(recipe, ({ many, one }) => ({
  likedBy: many(userLikedRecipe),
  dislikedBy: many(userDislikedRecipe),
  category: one(category, {
    fields: [recipe.categoryId],
    references: [category.id],
  }),
  area: one(area, {
    fields: [recipe.areaId],
    references: [area.id],
  }),
}));

export const userLikedRecipe = pgTable(
  "user_liked_recipe",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipe.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.recipeId],
    }),
  })
);

export const userLikedRecipeRelations = relations(userLikedRecipe, ({ one }) => ({
  recipe: one(recipe, {
    fields: [userLikedRecipe.recipeId],
    references: [recipe.id],
  }),
  user: one(user, {
    fields: [userLikedRecipe.userId],
    references: [user.id],
  }),
}));

export const userDislikedRecipe = pgTable(
  "user_disliked_recipe",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipe.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.recipeId],
    }),
  })
);

export const userDislikedRecipeRelations = relations(userDislikedRecipe, ({ one }) => ({
  recipe: one(recipe, {
    fields: [userDislikedRecipe.recipeId],
    references: [recipe.id],
  }),
  user: one(user, {
    fields: [userDislikedRecipe.userId],
    references: [user.id],
  }),
}));

export const userPreferredCategory = pgTable(
  "user_preferred_category",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    categoryId: text("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.categoryId],
    }),
  })
);

export const userPreferredCategoryRelations = relations(userPreferredCategory, ({ one }) => ({
  category: one(category, {
    fields: [userPreferredCategory.categoryId],
    references: [category.id],
  }),
  user: one(user, {
    fields: [userPreferredCategory.userId],
    references: [user.id],
  }),
}));

export const userPreferredArea = pgTable(
  "user_preferred_area",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    areaId: text("area_id")
      .notNull()
      .references(() => area.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.areaId],
    }),
  })
);

export const userPreferredAreaRelations = relations(userPreferredArea, ({ one }) => ({
  area: one(area, {
    fields: [userPreferredArea.areaId],
    references: [area.id],
  }),
  user: one(user, {
    fields: [userPreferredArea.userId],
    references: [user.id],
  }),
}));
