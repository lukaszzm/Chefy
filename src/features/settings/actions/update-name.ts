"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
import type { UpdateNamePayload } from "@/features/settings/schemas/name-schema";
import { updateUser } from "@/lib/db/queries/user";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getCurrentSession } from "@/lib/auth/session";

export const updateName = async (payload: UpdateNamePayload) => {
  const { user } = await getCurrentSession();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  try {
    await updateUser(user.id, { name: payload.name });
  } catch (e) {
    return errorResponse("Failed to update name");
  }

  revalidatePath(routes.settings);
  return successResponse("Name updated successfully");
};
