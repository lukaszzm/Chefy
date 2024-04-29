"use client";

import type { ReactNode } from "react";
import { useCallback, useState } from "react";

import { toast } from "sonner";

import { dislikeRecipe } from "@/features/explore/actions/dislike-recipe";
import { fetchMoreRecipes } from "@/features/explore/actions/fetch-more-recipes";
import { likeRecipe } from "@/features/explore/actions/like-recipe";
import type { SwipeVariant } from "@/features/explore/config";
import { RecipesContext } from "@/features/explore/contexts/recipes/context";
import type { RecipesContextType } from "@/features/explore/contexts/recipes/context";
import type { RecipeWithRelations } from "@/types";
import { sleep } from "@/utils/sleep";

interface RecipesContextProviderProps {
  children: ReactNode;
  initialData: Array<RecipeWithRelations>;
}

export const RecipesContextProvider = ({ children, initialData }: RecipesContextProviderProps) => {
  const [recipes, setRecipes] = useState(initialData);
  const [isFetching, setIsFetching] = useState(false);
  const [swipeVariant, setSwipeVariant] = useState<SwipeVariant>("like");

  const fetchMore = async () => {
    setIsFetching(true);

    // Wait for swipe animation to finish (swipe animation -> 500 ms)
    const [res] = await Promise.all([fetchMoreRecipes(), sleep(500)]);

    if (!res.ok) {
      setIsFetching(false);
      throw new Error("Could not fetch more recipes");
    }

    setRecipes(res.data);
    setIsFetching(false);
  };

  const removeFromList = useCallback(
    (id: string) => {
      const prevRecipes = recipes.filter(({ recipe }) => recipe.id !== id);
      setRecipes(prevRecipes);

      if (prevRecipes.length === 0) {
        fetchMore();
      }
    },
    [recipes]
  );

  const like = useCallback(
    async (id: string) => {
      setSwipeVariant("like");
      removeFromList(id);

      const res = await likeRecipe(id);

      if (!res.ok) {
        toast.error(res.error);
      }
    },
    [removeFromList]
  );

  const dislike = useCallback(
    async (id: string) => {
      setSwipeVariant("dislike");
      removeFromList(id);

      const res = await dislikeRecipe(id);

      if (!res.ok) {
        toast.error(res.error);
      }
    },
    [removeFromList]
  );

  const value = {
    recipes,
    swipeVariant,
    like,
    dislike,
    changeSwipeVariant: setSwipeVariant,
    isFetching,
  } as RecipesContextType;

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
};
