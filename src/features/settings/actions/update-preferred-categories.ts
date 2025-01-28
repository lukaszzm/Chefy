"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
import { updatePreferredCategories as updatePreferences } from "@/lib/db/queries/category";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getCurrentSession } from "@/lib/auth/session";

export const updatePreferredCategories = async (categories: string[]) => {
  const { user } = await getCurrentSession();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  try {
    await updatePreferences(user.id, categories);
  } catch (e) {
    return errorResponse("Failed to update preferred categories");
  }

  revalidatePath(routes.settings);
  revalidatePath(routes.explore);
  return successResponse("Preferred categories updated successfully");
};
