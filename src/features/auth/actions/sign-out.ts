"use server";

import { getAuthErrorMessage } from "@/features/auth/utils/get-auth-error-message";
import { auth } from "@/lib/auth";
import type { ActionResponse } from "@/types";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export async function signOut(): Promise<ActionResponse> {
  const t = await getTranslations("auth.actions.signOut");

  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return successResponse(t("success"));
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error);
    return errorResponse(errorMessage);
  }
}
