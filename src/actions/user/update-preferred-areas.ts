"use server";

import { eq } from "drizzle-orm";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { userPreferredArea } from "@/lib/db/schema";
import { errorResponse, successResponse } from "@/utils/action-response";

export const updatePreferredAreas = async (areas: string[]) => {
  const { user } = await validateRequest();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  try {
    await db.transaction(async (transaction) => {
      await db.delete(userPreferredArea).where(eq(userPreferredArea.userId, user.id));

      for (const area of areas) {
        await transaction.insert(userPreferredArea).values({
          userId: user.id,
          areaId: area,
        });
      }
    });
  } catch (e) {
    return errorResponse("Failed to update preferred areas");
  }

  return successResponse("Preferred areas updated");
};
