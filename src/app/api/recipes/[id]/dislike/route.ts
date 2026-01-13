import type { ApiRoutes } from "@/config/routes";
import { Routes } from "@/config/routes";
import { getAuthSession } from "@/lib/auth/utils";
import { createDislikeRecipe } from "@/lib/db/queries/recipe";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(
  _request: NextRequest,
  { params }: RouteContext<typeof ApiRoutes.LikeRecipe>
): Promise<NextResponse> {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id: recipeId } = await params;

  try {
    await createDislikeRecipe(session.user.id, recipeId);
  } catch {
    return new NextResponse("Failed to dislike recipe", { status: 500 });
  }

  revalidatePath(Routes.Discover);
  return NextResponse.json("Recipe disliked successfully", { status: 200 });
}
