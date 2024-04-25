"use server";

import { validateRequest } from "@/lib/auth";
import { updatePreferredCategories as updatePreferences } from "@/lib/db/queries/category";
import { errorResponse, successResponse } from "@/utils/action-response";

export const updatePreferredCategories = async (categories: string[]) => {
  const { user } = await validateRequest();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  try {
    await updatePreferences(user.id, categories);
    return successResponse("Preferred categories updated");
  } catch (e) {
    return errorResponse("Failed to update preferred categories");
  }
};
