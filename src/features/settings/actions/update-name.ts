"use server";

import { revalidatePath } from "next/cache";

import { Routes } from "@/config/routes";
import type { UpdateNamePayload } from "@/features/settings/schemas/name-schema";
import { updateUser } from "@/lib/db/queries/user";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";
import { getTranslations } from "next-intl/server";

export async function updateName(payload: UpdateNamePayload) {
  const [session, t] = await Promise.all([getAuthSession(), getTranslations("settings.actions.updateName")]);

  if (!session) {
    return errorResponse(t("errors.notAuthenticated"));
  }

  try {
    await updateUser(session.user.id, { name: payload.name });
  } catch {
    return errorResponse(t("errors.unknown"));
  }

  revalidatePath(Routes.Settings);
  return successResponse(t("success"));
}
