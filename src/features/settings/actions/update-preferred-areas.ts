"use server";

import { validateRequest } from "@/lib/auth";
import { updatePreferredAreas as updatePreferences } from "@/lib/db/queries/area";
import { errorResponse, successResponse } from "@/utils/action-response";

export const updatePreferredAreas = async (areas: string[]) => {
  const { user } = await validateRequest();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  try {
    await updatePreferences(user.id, areas);
    return successResponse("Preferred areas updated");
  } catch (e) {
    return errorResponse("Failed to update preferred areas");
  }
};
