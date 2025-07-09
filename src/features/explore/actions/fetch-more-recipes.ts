"use server";

import { getAuthSession } from "@/lib/auth/utils";
import { getSuggestedRecipes } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";

export async function fetchMoreRecipes() {
  const session = await getAuthSession();

  if (!session) {
    return errorResponse("Unauthorized");
  }

  const moreSuggestions = await getSuggestedRecipes(session.user.id);
  return successResponse(moreSuggestions);
}
