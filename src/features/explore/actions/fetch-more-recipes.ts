"use server";

import { validateRequest } from "@/lib/auth";
import { getSuggestedRecipes } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";

export const fetchMoreRecipes = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return errorResponse("Unauthorized");
  }

  const moreSuggestions = await getSuggestedRecipes(user.id);
  return successResponse(moreSuggestions);
};
