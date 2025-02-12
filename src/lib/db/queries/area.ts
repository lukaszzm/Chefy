import { cache } from "react";

import { eq, inArray } from "drizzle-orm";

import db from "@/lib/db";
import { areaTable, userPreferredAreaTable } from "@/lib/db/schema";

export const getAllAreas = cache(async () => db.query.areaTable.findMany());

export const getPreferredAreas = cache(async (userId: string) =>
  db.query.areaTable.findMany({
    where: inArray(
      areaTable.id,
      db
        .select({
          id: userPreferredAreaTable.areaId,
        })
        .from(userPreferredAreaTable)
        .where(eq(userPreferredAreaTable.userId, userId))
    ),
  })
);

export async function deletePreferredAreas(userId: string) {
  return db.delete(userPreferredAreaTable).where(eq(userPreferredAreaTable.userId, userId));
}

export async function createPreferredArea(userId: string, areaId: string) {
  db.insert(userPreferredAreaTable).values({
    userId,
    areaId,
  });
}

export async function updatePreferredAreas(userId: string, areas: string[]) {
  return db.transaction(async () => {
    await deletePreferredAreas(userId);

    for (const areaId of areas) {
      await createPreferredArea(userId, areaId);
    }
  });
}
