"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
import { getCurrentSession } from "@/lib/auth/session";
import { updatePreferredCategories as updatePreferences } from "@/lib/db/queries/category";
import { errorResponse, successResponse } from "@/utils/action-response";

export const updatePreferredCategories = async (categories: string[]) => {
  const { user } = await getCurrentSession();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  try {
    await updatePreferences(user.id, categories);
  } catch {
    return errorResponse("Failed to update preferred categories");
  }

  revalidatePath(routes.settings);
  revalidatePath(routes.explore);
  return successResponse("Preferred categories updated successfully");
};
