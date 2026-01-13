"use client";

import type { SwipeDirection } from "@/features/discover/config/swipe";
import { SwipeDirections } from "@/features/discover/config/swipe";
import { REMAINING_ITEMS_THRESHOLD } from "@/features/discover/config/threshold";
import type { DiscoverContextType } from "@/features/discover/context";
import { DiscoverContext } from "@/features/discover/context";
import { useDislikeRecipe } from "@/features/discover/hooks/use-dislike-recipe";
import { useInfiniteRecipes } from "@/features/discover/hooks/use-infinite-recipes";
import { useLikeRecipe } from "@/features/discover/hooks/use-like-recipe";
import { getInfiniteRecipesQueryKey } from "@/features/discover/utils/get-infinite-recipes-query-key";
import { removeRecipeFromInfiniteQuery } from "@/features/discover/utils/remove-recipe-from-infinite-query";
import type { RecipeWithRelations } from "@/types";
import type { InfiniteData } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

interface DiscoverProviderProps extends React.PropsWithChildren {
  initialData: ReadonlyArray<RecipeWithRelations>;
  userId: string;
}

export function DiscoverProvider({ initialData, userId, children }: DiscoverProviderProps) {
  const queryClient = useQueryClient();
  const pendingRecipeIds = useRef(new Set<string>());

  const [swipeDir, setSwipeDir] = useState<SwipeDirection>(SwipeDirections.Right);

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteRecipes({
    initialData,
    userId,
    pendingRecipeIds,
  });

  const { mutate: likeRecipeMutation } = useLikeRecipe({
    onMutate: (recipeId) => {
      pendingRecipeIds.current.add(recipeId);
      setSwipeDir(SwipeDirections.Right);
      removeAndFetchMore(recipeId);
    },
    onSettled: (_data, _error, recipeId) => {
      pendingRecipeIds.current.delete(recipeId);
    },
    onError: () => {
      toast.error("Could not like recipe");
    },
  });

  const { mutate: dislikeRecipeMutation } = useDislikeRecipe({
    onMutate: (recipeId) => {
      pendingRecipeIds.current.add(recipeId);
      setSwipeDir(SwipeDirections.Left);
      removeAndFetchMore(recipeId);
    },
    onSettled: (_data, _error, recipeId) => {
      pendingRecipeIds.current.delete(recipeId);
    },
    onError: () => {
      toast.error("Could not dislike recipe");
    },
  });

  const recipes = useMemo(() => data.pages.flatMap((page) => page).toReversed(), [data.pages]);

  const removeAndFetchMore = useCallback(
    (id: string) => {
      const infiniteRecipesQueryKey = getInfiniteRecipesQueryKey(userId);

      const updatedData = queryClient.setQueryData<InfiniteData<RecipeWithRelations[], unknown>>(
        infiniteRecipesQueryKey,
        (infiniteData) => removeRecipeFromInfiniteQuery(infiniteData, id)
      );

      const remainingItems = updatedData?.pages.flatMap((page) => page).length ?? 0;

      if (remainingItems <= REMAINING_ITEMS_THRESHOLD && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    [queryClient, userId, hasNextPage, isFetching, fetchNextPage]
  );

  const value = {
    recipes,
    pending: isFetching,
    swipeDirection: swipeDir,
    likeRecipe: likeRecipeMutation,
    dislikeRecipe: dislikeRecipeMutation,
    changeSwipeDirection: setSwipeDir,
  } as const satisfies DiscoverContextType;

  return <DiscoverContext value={value}>{children}</DiscoverContext>;
}
