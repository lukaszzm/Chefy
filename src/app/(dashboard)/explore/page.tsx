import { ExploreRecipes } from "@/features/explore/components/recipes";
import { getCurrentUser } from "@/lib/auth/session";
import { getSuggestedRecipes } from "@/lib/db/queries/recipe";

export default async function ExplorePage() {
  const user = await getCurrentUser();
  const suggestions = await getSuggestedRecipes(user.id);

  return <ExploreRecipes initialData={suggestions} />;
}
