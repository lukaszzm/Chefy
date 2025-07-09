"use server";

import type { SignInPayload } from "@/features/auth/schemas/sign-in-schema";
import { getAuthErrorMessage } from "@/features/auth/utils/get-auth-error-message";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types";
import { errorResponse, successResponse } from "@/utils/action-response";

export async function signIn(payload: SignInPayload): Promise<ActionResponse> {
  try {
    await auth.api.signInEmail({
      body: {
        email: payload.email.toLowerCase(),
        password: payload.password,
      },
    });

    return successResponse("Sign in successful");
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error);
    return errorResponse(errorMessage);
  }
}
