"use server";

import { eq } from "drizzle-orm";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { user } from "@/lib/db/schema";
import type { ChangeNameValues } from "@/schemas/settings/name-schema";
import { errorResponse, successResponse } from "@/utils/action-response";

export const updateName = async (payload: ChangeNameValues) => {
  const { user: authUser } = await validateRequest();

  if (!authUser) {
    return errorResponse("Unauthorized");
  }

  try {
    await db.update(user).set({ name: payload.name }).where(eq(user.id, authUser.id));
    return successResponse("Name updated successfully");
  } catch (e) {
    return errorResponse("Failed to update name");
  }
};
