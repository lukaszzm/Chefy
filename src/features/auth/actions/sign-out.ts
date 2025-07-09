"use server";

import { getAuthErrorMessage } from "@/features/auth/utils/get-auth-error-message";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types";
import { errorResponse, successResponse } from "@/utils/action-response";
import { headers } from "next/headers";

export async function signOut(): Promise<ActionResponse> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return successResponse("Sign out successful");
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error);
    return errorResponse(errorMessage);
  }
}
