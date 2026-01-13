"use server";

import { revalidatePath } from "next/cache";

import { Routes } from "@/config/routes";
import { updatePreferredCategories as updatePreferences } from "@/lib/db/queries/category";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";

export async function updatePreferredCategories(categories: string[]) {
  const session = await getAuthSession();

  if (!session) {
    return errorResponse("Unauthorized");
  }

  try {
    await updatePreferences(session.user.id, categories);
  } catch {
    return errorResponse("Failed to update preferred categories");
  }

  revalidatePath(Routes.Settings);
  revalidatePath(Routes.Discover);
  return successResponse("Preferred categories updated successfully");
}
