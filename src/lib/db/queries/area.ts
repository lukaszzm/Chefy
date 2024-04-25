import { eq, inArray } from "drizzle-orm";

import db from "@/lib/db";
import { area, userPreferredArea } from "@/lib/db/schema";

export const getAllAreas = () => db.query.area.findMany();

export const getPreferredAreas = (userId: string) =>
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
  });

export const deletePreferredAreas = async (userId: string) =>
  db.delete(userPreferredArea).where(eq(userPreferredArea.userId, userId));

export const createPreferredArea = async (userId: string, areaId: string) =>
  db.insert(userPreferredArea).values({
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
