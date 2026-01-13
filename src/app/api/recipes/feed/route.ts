import { getAuthSession } from "@/lib/auth/utils";
import { getPersonalizedRecipes } from "@/lib/db/queries/recipe";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const cursor = request.nextUrl.searchParams.get("cursor") ?? undefined;
  const excludeIdsParam = request.nextUrl.searchParams.get("excludeIds");
  const excludeIds = excludeIdsParam ? excludeIdsParam.split(",").filter(Boolean) : undefined;

  const personalizedRecipes = await getPersonalizedRecipes(session.user.id, cursor, excludeIds);

  return NextResponse.json(personalizedRecipes);
}
