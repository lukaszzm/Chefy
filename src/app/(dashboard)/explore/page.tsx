import { routes } from "@/config/routes";
import { ExploreRecipes } from "@/features/explore/components/recipes";
import { getAuthSession } from "@/lib/auth/utils";
import { getSuggestedRecipes } from "@/lib/db/queries/recipe";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Explore recipes | Chefy",
};

export default async function ExplorePage() {
  const session = await getAuthSession();

  if (!session) {
    return redirect(routes.signIn);
  }

  const suggestions = await getSuggestedRecipes(session.user.id);

  return <ExploreRecipes initialData={suggestions} />;
}
