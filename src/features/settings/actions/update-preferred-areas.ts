"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
import { updatePreferredAreas as updatePreferences } from "@/lib/db/queries/area";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";

export async function updatePreferredAreas(areas: string[]) {
  const session = await getAuthSession();

  if (!session) {
    return errorResponse("Unauthorized");
  }

  try {
    await updatePreferences(session.user.id, areas);
  } catch {
    return errorResponse("Failed to update preferred areas");
  }

  revalidatePath(routes.settings);
  revalidatePath(routes.explore);
  return successResponse("Preferred areas updated successfully");
}
