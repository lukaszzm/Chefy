"use server";

import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { user } from "@/lib/db/schema";
import type { ChangePasswordValues } from "@/schemas/settings/password-schema";
import { errorResponse, successResponse } from "@/utils/action-response";

export const updatePassword = async (payload: ChangePasswordValues) => {
  const { user: authUser } = await validateRequest();

  if (!authUser) {
    return errorResponse("Unauthorized");
  }

  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, authUser.id),
  });

  if (!currentUser) {
    return errorResponse("User not found");
  }

  const validPassword = await new Argon2id().verify(currentUser.password, payload.currentPassword);

  if (!validPassword) {
    return errorResponse("Incorrect current password");
  }

  const hashedNewPassword = await new Argon2id().hash(payload.newPassword);

  try {
    await db.update(user).set({ password: hashedNewPassword }).where(eq(user.id, authUser.id));
    return successResponse("Password updated successfully");
  } catch (e) {
    return errorResponse("Failed to update name");
  }
};
