import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
});

export const userRelations = relations(userTable, ({ many }) => ({
  likedRecipes: many(userLikedRecipeTable),
  dislikedRecipes: many(userDislikedRecipeTable),
  preferredCategories: many(userPreferredCategoryTable),
  preferredAreas: many(userPreferredAreaTable),
}));

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const categoryTable = pgTable("category", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const categoryRelations = relations(categoryTable, ({ many }) => ({
  preferredBy: many(userPreferredCategoryTable),
  recipes: many(recipeTable),
}));

export const areaTable = pgTable("area", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const areaRelations = relations(areaTable, ({ many }) => ({
  preferredBy: many(userPreferredAreaTable),
  recipes: many(recipeTable),
}));

export const recipeTable = pgTable("recipe", {
  id: text("id").primaryKey(),
  imageSrc: text("image_src").notNull(),
  title: text("title").notNull(),
  categoryId: text("category_id").notNull(),
  areaId: text("area_id").notNull(),
  instructions: text("instructions").notNull(),
  ingredients: text("ingredients").array().notNull(),
});

export const recipeRelations = relations(recipeTable, ({ many, one }) => ({
  likedBy: many(userLikedRecipeTable),
  dislikedBy: many(userDislikedRecipeTable),
  category: one(categoryTable, {
    fields: [recipeTable.categoryId],
    references: [categoryTable.id],
  }),
  area: one(areaTable, {
    fields: [recipeTable.areaId],
    references: [areaTable.id],
  }),
}));

export const userLikedRecipeTable = pgTable(
  "user_liked_recipe",
  {
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipeTable.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.recipeId],
    }),
  })
);

export const userLikedRecipeRelations = relations(userLikedRecipeTable, ({ one }) => ({
  recipe: one(recipeTable, {
    fields: [userLikedRecipeTable.recipeId],
    references: [recipeTable.id],
  }),
  user: one(userTable, {
    fields: [userLikedRecipeTable.userId],
    references: [userTable.id],
  }),
}));

export const userDislikedRecipeTable = pgTable(
  "user_disliked_recipe",
  {
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    recipeId: text("recipe_id")
      .notNull()
      .references(() => recipeTable.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.recipeId],
    }),
  })
);

export const userDislikedRecipeRelations = relations(userDislikedRecipeTable, ({ one }) => ({
  recipe: one(recipeTable, {
    fields: [userDislikedRecipeTable.recipeId],
    references: [recipeTable.id],
  }),
  user: one(userTable, {
    fields: [userDislikedRecipeTable.userId],
    references: [userTable.id],
  }),
}));

export const userPreferredCategoryTable = pgTable(
  "user_preferred_category",
  {
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    categoryId: text("category_id")
      .notNull()
      .references(() => categoryTable.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.categoryId],
    }),
  })
);

export const userPreferredCategoryRelations = relations(userPreferredCategoryTable, ({ one }) => ({
  category: one(categoryTable, {
    fields: [userPreferredCategoryTable.categoryId],
    references: [categoryTable.id],
  }),
  user: one(userTable, {
    fields: [userPreferredCategoryTable.userId],
    references: [userTable.id],
  }),
}));

export const userPreferredAreaTable = pgTable(
  "user_preferred_area",
  {
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    areaId: text("area_id")
      .notNull()
      .references(() => areaTable.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.areaId],
    }),
  })
);

export const userPreferredAreaRelations = relations(userPreferredAreaTable, ({ one }) => ({
  area: one(areaTable, {
    fields: [userPreferredAreaTable.areaId],
    references: [areaTable.id],
  }),
  user: one(userTable, {
    fields: [userPreferredAreaTable.userId],
    references: [userTable.id],
  }),
}));
