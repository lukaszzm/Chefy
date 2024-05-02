"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
import type { UpdateNamePayload } from "@/features/settings/schemas/name-schema";
import { validateRequest } from "@/lib/auth";
import { updateUser } from "@/lib/db/queries/user";
import { errorResponse, successResponse } from "@/utils/action-response";

export const updateName = async (payload: UpdateNamePayload) => {
  const { user: authUser } = await validateRequest();

  if (!authUser) {
    return errorResponse("Unauthorized");
  }

  try {
    await updateUser(authUser.id, { name: payload.name });
  } catch (e) {
    return errorResponse("Failed to update name");
  }

  revalidatePath(routes.settings);
  return successResponse("Name updated successfully");
};
