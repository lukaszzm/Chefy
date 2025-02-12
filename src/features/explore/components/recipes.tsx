import { ExploreStack } from "@/features/explore/components/stack";
import { RecipesContextProvider } from "@/features/explore/contexts/recipes/provider";
import type { RecipeWithRelations } from "@/types";

interface ExploreRecipesProps {
  initialData: RecipeWithRelations[];
}

export function ExploreRecipes({ initialData }: ExploreRecipesProps) {
  return (
    <RecipesContextProvider initialData={initialData}>
      <ExploreStack />
    </RecipesContextProvider>
  );
}
