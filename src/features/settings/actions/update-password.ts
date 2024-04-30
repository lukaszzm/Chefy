"use server";

import { Scrypt } from "lucia";

import type { UpdatePasswordPayload } from "@/features/settings/schemas/password-schema";
import { validateRequest } from "@/lib/auth";
import { getUserWithPasswordById, updateUser } from "@/lib/db/queries/user";
import { errorResponse, successResponse } from "@/utils/action-response";

export const updatePassword = async (payload: UpdatePasswordPayload) => {
  const { user: authUser } = await validateRequest();

  if (!authUser) {
    return errorResponse("Unauthorized");
  }

  const currentUser = await getUserWithPasswordById(authUser.id);

  if (!currentUser) {
    return errorResponse("User not found");
  }

  const validPassword = await new Scrypt().verify(currentUser.password, payload.currentPassword);

  if (!validPassword) {
    return errorResponse("Incorrect current password");
  }

  const hashedNewPassword = await new Scrypt().hash(payload.newPassword);

  try {
    await updateUser(authUser.id, { password: hashedNewPassword });
    return successResponse("Password updated successfully");
  } catch (e) {
    return errorResponse("Failed to update name");
  }
};
