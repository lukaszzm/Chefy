import type { ApiRoutes } from "@/config/routes";
import { Routes } from "@/config/routes";
import { getAuthSession } from "@/lib/auth/utils";
import { createDislikeRecipe } from "@/lib/db/queries/recipe";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(
  _request: NextRequest,
  { params }: RouteContext<typeof ApiRoutes.LikeRecipe>
): Promise<NextResponse> {
  const [session, t] = await Promise.all([getAuthSession(), getTranslations("api")]);

  if (!session) {
    return new NextResponse(t("errors.unauthorized"), { status: 401 });
  }

  const { id: recipeId } = await params;

  try {
    await createDislikeRecipe(session.user.id, recipeId);
  } catch {
    return new NextResponse(t("errors.serverError"), { status: 500 });
  }

  revalidatePath(Routes.Discover);
  return NextResponse.json(t("success.recipeDisliked"), { status: 200 });
}
