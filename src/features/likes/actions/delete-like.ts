"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Routes } from "@/config/routes";
import { deleteLikeRecipe, getLikeRecipe } from "@/lib/db/queries/recipe";
import { errorResponse, successResponse } from "@/utils/action-response";
import { getAuthSession } from "@/lib/auth/utils";
import { getTranslations } from "next-intl/server";

export async function deleteLike(recipeId: string, withRedirect: boolean) {
  const [session, t] = await Promise.all([getAuthSession(), getTranslations("likes.actions.delete")]);

  if (!session) {
    return errorResponse(t("errors.notAuthenticated"));
  }

  const like = await getLikeRecipe(session.user.id, recipeId);

  if (!like) {
    return errorResponse(t("errors.notFound"));
  }

  if (like.userId !== session.user.id) {
    return errorResponse(t("errors.notAuthenticated"));
  }

  try {
    await deleteLikeRecipe(like.userId, recipeId);
  } catch {
    return errorResponse(t("errors.unknown"));
  }

  revalidatePath(Routes.Likes);
  return withRedirect ? redirect(Routes.Likes) : successResponse(t("success"));
}
