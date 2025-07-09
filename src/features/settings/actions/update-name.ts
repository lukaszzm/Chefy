"use server";

import { revalidatePath } from "next/cache";

import { routes } from "@/config/routes";
import type { UpdateNamePayload } from "@/features/settings/schemas/name-schema";
import { updateUser } from "@/lib/db/queries/user";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";

export async function updateName(payload: UpdateNamePayload) {
  const session = await getAuthSession();

  if (!session) {
    return errorResponse("Unauthorized");
  }

  try {
    await updateUser(session.user.id, { name: payload.name });
  } catch {
    return errorResponse("Failed to update name");
  }

  revalidatePath(routes.settings);
  return successResponse("Name updated successfully");
}
