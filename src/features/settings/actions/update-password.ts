"use server";

import type { UpdatePasswordPayload } from "@/features/settings/schemas/password-schema";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";
import { auth } from "@/lib/auth";
import { getAccountByUserId } from "@/lib/db/queries/account";
import { getTranslations } from "next-intl/server";
import { TEST_MAIL } from "@/features/settings/config/constants";

export async function updatePassword(payload: UpdatePasswordPayload) {
  const [session, t] = await Promise.all([getAuthSession(), getTranslations("settings.actions.updatePassword")]);

  if (!session) {
    return errorResponse(t("errors.notAuthenticated"));
  }

  if (session.user.email === TEST_MAIL) {
    return errorResponse(t("errors.testAccountPasswordChange"));
  }

  try {
    const currentAccount = await getAccountByUserId(session.user.id);

    if (!currentAccount) {
      return errorResponse(t("errors.accountNotFound"));
    }

    const currentPassword = currentAccount.password;

    if (!currentPassword) {
      return errorResponse(t("errors.currentPasswordMissing"));
    }

    const ctx = await auth.$context;
    const passwordMatch = await ctx.password.verify({ password: payload.currentPassword, hash: currentPassword });

    if (!passwordMatch) {
      return errorResponse(t("errors.currentPasswordIncorrect"));
    }

    const hashedNewPassword = await ctx.password.hash(payload.newPassword);
    await ctx.internalAdapter.updatePassword(session.user.id, hashedNewPassword);

    return successResponse(t("success"));
  } catch {
    return errorResponse(t("errors.unknown"));
  }
}
