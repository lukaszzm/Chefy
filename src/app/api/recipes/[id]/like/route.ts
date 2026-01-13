import type { ApiRoutes } from "@/config/routes";
import { Routes } from "@/config/routes";
import { getAuthSession } from "@/lib/auth/utils";
import { createLikeRecipe } from "@/lib/db/queries/recipe";
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
    await createLikeRecipe(session.user.id, recipeId);
  } catch {
    return new NextResponse("Failed to like recipe", { status: 500 });
  }

  revalidatePath(Routes.Discover);
  return NextResponse.json("Recipe liked successfully", { status: 200 });
}
