import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/lib/db/schema";
import { SeedData } from "@/lib/db/seed-data";

dotenv.config();

async function main() {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL!,
  });

  const db = drizzle(client, { schema });

  console.info("Seeding database...");

  console.info("Inserting categories...");
  await db.insert(schema.categoryTable).values(SeedData.Categories);
  console.info("Categories inserted.");

  console.info("Inserting areas...");
  await db.insert(schema.areaTable).values(SeedData.Areas);
  console.info("Areas inserted.");

  console.info("Inserting recipes...");
  await db.insert(schema.recipeTable).values(SeedData.Recipes);
  console.info("Recipes inserted.");

  console.info("Database seeded.");
  await client.end();
}

main().catch(console.error);
