"use server";

import { revalidatePath } from "next/cache";

import { Routes } from "@/config/routes";
import { updatePreferredCategories as updatePreferences } from "@/lib/db/queries/category";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";
import { getTranslations } from "next-intl/server";

export async function updatePreferredCategories(categories: string[]) {
  const [session, t] = await Promise.all([
    getAuthSession(),
    getTranslations("settings.actions.updatePreferredCategories"),
  ]);

  if (!session) {
    return errorResponse(t("errors.notAuthenticated"));
  }

  try {
    await updatePreferences(session.user.id, categories);
  } catch {
    return errorResponse(t("errors.unknown"));
  }

  revalidatePath(Routes.Settings);
  revalidatePath(Routes.Discover);
  return successResponse(t("success"));
}
