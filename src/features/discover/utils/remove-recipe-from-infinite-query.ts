import type { RecipeWithRelations } from "@/types";
import type { InfiniteData } from "@tanstack/react-query";

type InfiniteRecipesData = InfiniteData<RecipeWithRelations[], unknown>;

function removeRecipeFromPages(pages: RecipeWithRelations[][], recipeId: string): RecipeWithRelations[][] {
  return pages.map((page) => page.filter((item) => item.recipe.id !== recipeId));
}

function removeEmptyPages(pages: RecipeWithRelations[][]): RecipeWithRelations[][] {
  return pages.filter((page) => page.length > 0);
}

export function removeRecipeFromInfiniteQuery(
  infiniteData: InfiniteRecipesData | undefined,
  recipeId: string
): InfiniteRecipesData | undefined {
  if (!infiniteData) {
    return infiniteData;
  }

  const pagesWithoutRecipe = removeRecipeFromPages(infiniteData.pages, recipeId);
  const onlyNonEmptyPages = removeEmptyPages(pagesWithoutRecipe);

  return {
    pages: onlyNonEmptyPages,
    pageParams: infiniteData.pageParams.slice(0, onlyNonEmptyPages.length),
  };
}
