"use server";

import { compare, hash } from "bcrypt";

import type { UpdatePasswordPayload } from "@/features/settings/schemas/password-schema";
import { getUserWithPasswordById, updateUser } from "@/lib/db/queries/user";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getCurrentSession } from "@/lib/auth/session";

const TEST_MAIL = "test@test.com";

export const updatePassword = async (payload: UpdatePasswordPayload) => {
  const { user } = await getCurrentSession();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  const currentUser = await getUserWithPasswordById(user.id);

  if (!currentUser) {
    return errorResponse("User not found");
  }

  if (currentUser.email === TEST_MAIL) {
    return errorResponse("Cannot update password for test user");
  }

  const validPassword = await compare(payload.currentPassword, currentUser.password);
  if (!validPassword) {
    return errorResponse("Incorrect current password");
  }

  const hashedPassword = await hash(payload.newPassword, 8);

  try {
    await updateUser(user.id, { password: hashedPassword });
  } catch (e) {
    return errorResponse("Failed to update name");
  }

  return successResponse("Password updated successfully");
};
