import { getSuggestedRecipes } from "@/actions/recipe/get-suggested-recipes";
import { ExploreStack } from "@/components/explore/explore-stack";
import { RecipesContextProvider } from "@/contexts/recipes/provider";

export default async function ExplorePage() {
  const suggestions = await getSuggestedRecipes();

  return (
    <RecipesContextProvider initialData={suggestions}>
      <ExploreStack />
    </RecipesContextProvider>
  );
}
