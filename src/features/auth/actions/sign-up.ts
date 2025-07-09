"use server";

import type { SignUpPayload } from "@/features/auth/schemas/sign-up-schema";
import { errorResponse, successResponse } from "@/utils/action-response";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types";
import { getAuthErrorMessage } from "@/features/auth/utils/get-auth-error-message";

export async function signUp(payload: SignUpPayload): Promise<ActionResponse> {
  try {
    await auth.api.signUpEmail({
      body: {
        email: payload.email.toLowerCase(),
        name: payload.name,
        password: payload.password,
      },
    });

    return successResponse("Sign up successful");
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error);
    return errorResponse(errorMessage);
  }
}
