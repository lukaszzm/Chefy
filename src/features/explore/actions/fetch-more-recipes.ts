"use server";

import { getCurrentSession } from "@/lib/auth/session";
import { getSuggestedRecipes } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";

export const fetchMoreRecipes = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  const moreSuggestions = await getSuggestedRecipes(user.id);
  return successResponse(moreSuggestions);
};
