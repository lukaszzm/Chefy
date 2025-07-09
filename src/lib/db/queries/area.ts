import { cache } from "react";

import { eq, inArray } from "drizzle-orm";

import db from "@/lib/db";
import { area, userPreferredArea } from "@/lib/db/schema";

export const getAllAreas = cache(async () => db.query.area.findMany());

export const getPreferredAreas = cache(async (userId: string) =>
  db.query.area.findMany({
    where: inArray(
      area.id,
      db
        .select({
          id: userPreferredArea.areaId,
        })
        .from(userPreferredArea)
        .where(eq(userPreferredArea.userId, userId))
    ),
  })
);

export async function deletePreferredAreas(userId: string) {
  return db.delete(userPreferredArea).where(eq(userPreferredArea.userId, userId));
}

export async function createPreferredArea(userId: string, areaId: string) {
  return db.insert(userPreferredArea).values({
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
