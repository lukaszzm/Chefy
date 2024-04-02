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
    .references(() => user.id),
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

export const recipeRelations = relations(recipe, ({ one, many }) => ({
  category: one(category, {
    fields: [recipe.categoryId],
    references: [category.id],
  }),
  area: one(area, {
    fields: [recipe.areaId],
    references: [area.id],
  }),
  likedBy: many(userLikedRecipe),
  dislikedBy: many(userDislikedRecipe),
}));

export const userLikedRecipe = pgTable(
  "user_liked_recipe",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipe.id),
    likedAt: timestamp("liked_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.recipeId],
    }),
  })
);

export const userDislikedRecipe = pgTable(
  "user_disliked_recipe",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipe.id),
    likedAt: timestamp("liked_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.recipeId],
    }),
  })
);

export const userPreferredCategory = pgTable(
  "user_preferred_category",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    categoryId: text("category_id")
      .notNull()
      .references(() => category.id),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.categoryId],
    }),
  })
);

export const userPreferredArea = pgTable(
  "user_preferred_area",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    areaId: text("area_id")
      .notNull()
      .references(() => area.id),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.areaId],
    }),
  })
);
