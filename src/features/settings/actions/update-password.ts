"use server";

import type { UpdatePasswordPayload } from "@/features/settings/schemas/password-schema";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";
import { auth } from "@/lib/auth";
import { getAccountByUserId } from "@/lib/db/queries/account";

const TEST_MAIL = "test@test.com";

export async function updatePassword(payload: UpdatePasswordPayload) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return errorResponse("Unauthorized");
    }

    if (session.user.email === TEST_MAIL) {
      return errorResponse("Cannot update password for test user");
    }

    const currentAccount = await getAccountByUserId(session.user.id);

    if (!currentAccount) {
      return errorResponse("Account not found");
    }

    const currentPassword = currentAccount.password;

    if (!currentPassword) {
      return errorResponse("No password set for this account");
    }

    const ctx = await auth.$context;
    const passwordMatch = await ctx.password.verify({ password: payload.currentPassword, hash: currentPassword });

    if (!passwordMatch) {
      return errorResponse("Current password is incorrect");
    }

    const hashedNewPassword = await ctx.password.hash(payload.newPassword);
    await ctx.internalAdapter.updatePassword(session.user.id, hashedNewPassword);

    return successResponse("Password updated successfully");
  } catch {
    return errorResponse("Failed to update password");
  }
}
