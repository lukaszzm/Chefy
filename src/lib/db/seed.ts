import * as dotenv from "dotenv";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { area, category, recipe } from "@/lib/db/schema";
import areas from "@data/areas.json";
import categories from "@data/categories.json";
import recipes from "@data/recipes.json";

dotenv.config();

const seedCategories = async (db: NodePgDatabase) => {
  for (const categoryRecord of categories) {
    await db.insert(category).values(categoryRecord);
  }
};

const seedAreas = async (db: NodePgDatabase) => {
  for (const areaRecord of areas) {
    await db.insert(area).values(areaRecord);
  }
};

const seedRecipes = async (db: NodePgDatabase) => {
  for (const recipeRecord of recipes) {
    await db.insert(recipe).values(recipeRecord);
  }
};

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);

  console.log("Seeding database...");

  try {
    await seedCategories(db);
    await seedAreas(db);
    await seedRecipes(db);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }

  await client.end();
};

main();
