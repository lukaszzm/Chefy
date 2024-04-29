import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

dotenv.config();

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);

  console.log("Migrating database...");

  try {
    await migrate(db, { migrationsFolder: "./drizzle" });

    console.log("Database migrated successfully!");
  } catch (error) {
    console.error("Error migrating database:", error);
  }
  await client.end();
};

main();
