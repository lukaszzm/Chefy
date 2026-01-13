import { fetchMoreRecipes } from "@/features/discover/api/fetch-more-recipes";
import { getInfiniteRecipesQueryKey } from "@/features/discover/utils/get-infinite-recipes-query-key";
import type { RecipeWithRelations } from "@/types";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { RefObject } from "react";

interface UseInfiniteRecipesOptions {
  initialData: ReadonlyArray<RecipeWithRelations>;
  userId: string;
  pendingRecipeIds: RefObject<Set<string>>;
}

export function useInfiniteRecipes({ initialData, userId, pendingRecipeIds }: UseInfiniteRecipesOptions) {
  return useSuspenseInfiniteQuery({
    queryKey: getInfiniteRecipesQueryKey(userId),
    queryFn: async ({ pageParam }) => {
      const excludeIds = Array.from(pendingRecipeIds.current);
      return fetchMoreRecipes({ cursor: pageParam, excludeIds });
    },
    initialPageParam: undefined as string | undefined,
    initialData: {
      pages: [initialData],
      pageParams: [undefined],
    },
    getNextPageParam: (lastPage) => lastPage.at(-1)?.recipe.id,
  });
}
