import { primaryKey, pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()),
});

export const userRelations = relations(user, ({ many }) => ({
  likedRecipes: many(userLikedRecipe),
  dislikedRecipes: many(userDislikedRecipe),
  preferredCategories: many(userPreferredCategory),
  preferredAreas: many(userPreferredArea),
}));

export const category = pgTable("category", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  preferredBy: many(userPreferredCategory),
  recipes: many(recipe),
}));

export const area = pgTable("area", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
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
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
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
