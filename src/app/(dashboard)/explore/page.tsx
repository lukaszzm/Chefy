import { ExploreRecipes } from "@/features/explore/components/recipes";
import { authUser } from "@/lib/auth";
import { getSuggestedRecipes } from "@/lib/db/queries/recipe";

export default async function ExplorePage() {
  const { id } = await authUser();
  const suggestions = await getSuggestedRecipes(id);

  return <ExploreRecipes initialData={suggestions} />;
}
