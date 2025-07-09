import dotenv from "dotenv";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/lib/db/schema";
import CategoriesJSON from "@/lib/db/seed/categories.json";
import AreasJSON from "@/lib/db/seed/areas.json";
import RecipesJSON from "@/lib/db/seed/recipes.json";

dotenv.config();

async function main() {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL!,
  });

  const db = drizzle(client, { schema });

  console.info("Seeding database...");

  console.info("Inserting categories...");
  await db.insert(schema.category).values(CategoriesJSON);
  console.info("Categories inserted.");

  console.info("Inserting areas...");
  await db.insert(schema.area).values(AreasJSON);
  console.info("Areas inserted.");

  console.info("Inserting recipes...");
  await db.insert(schema.recipe).values(RecipesJSON);
  console.info("Recipes inserted.");

  console.info("Database seeded.");
  await client.end();
}

main().catch(console.error);
