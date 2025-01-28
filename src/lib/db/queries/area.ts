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

export const deletePreferredAreas = async (userId: string) =>
  db.delete(userPreferredAreaTable).where(eq(userPreferredAreaTable.userId, userId));

export const createPreferredArea = async (userId: string, areaId: string) =>
  db.insert(userPreferredAreaTable).values({
    userId,
    areaId,
  });

export const updatePreferredAreas = async (userId: string, areas: string[]) =>
  db.transaction(async () => {
    await deletePreferredAreas(userId);

    for (const areaId of areas) {
      await createPreferredArea(userId, areaId);
    }
  });
