"use server";

import type { SignInPayload } from "@/features/auth/schemas/sign-in-schema";
import { getAuthErrorMessage } from "@/features/auth/utils/get-auth-error-message";
import { auth } from "@/lib/auth";
import type { ActionResponse } from "@/types";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getTranslations } from "next-intl/server";

export async function signIn(payload: SignInPayload): Promise<ActionResponse> {
  const t = await getTranslations("auth.actions.signIn");

  try {
    await auth.api.signInEmail({
      body: {
        email: payload.email.toLowerCase(),
        password: payload.password,
      },
    });

    return successResponse(t("success"));
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error);
    return errorResponse(errorMessage);
  }
}
