"use server";

import type { SignUpPayload } from "@/features/auth/schemas/sign-up-schema";
import { errorResponse, successResponse } from "@/utils/action-response";
import { auth } from "@/lib/auth";
import type { ActionResponse } from "@/types";
import { getAuthErrorMessage } from "@/features/auth/utils/get-auth-error-message";
import { getTranslations } from "next-intl/server";

export async function signUp(payload: SignUpPayload): Promise<ActionResponse> {
  const t = await getTranslations("auth.actions.signUp");

  try {
    await auth.api.signUpEmail({
      body: {
        email: payload.email.toLowerCase(),
        name: payload.name,
        password: payload.password,
      },
    });

    return successResponse(t("success"));
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error);
    return errorResponse(errorMessage);
  }
}
