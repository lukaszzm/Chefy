"use server";

import { revalidatePath } from "next/cache";

import { Routes } from "@/config/routes";
import { updatePreferredAreas as updatePreferences } from "@/lib/db/queries/area";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";
import { getTranslations } from "next-intl/server";

export async function updatePreferredAreas(areas: string[]) {
  const [session, t] = await Promise.all([getAuthSession(), getTranslations("settings.actions.updatePreferredAreas")]);

  if (!session) {
    return errorResponse(t("errors.notAuthenticated"));
  }

  try {
    await updatePreferences(session.user.id, areas);
  } catch {
    return errorResponse(t("errors.unknown"));
  }

  revalidatePath(Routes.Settings);
  revalidatePath(Routes.Discover);
  return successResponse(t("success"));
}
