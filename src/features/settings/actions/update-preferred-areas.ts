"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
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
  } catch (e) {
    return errorResponse("Failed to update preferred areas");
  }

  revalidatePath(routes.settings);
  revalidatePath(routes.explore);
  return successResponse("Preferred areas updated");
};
