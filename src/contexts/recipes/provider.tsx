"use client";

import type { ReactNode } from "react";
import { useCallback, useState } from "react";

import { toast } from "sonner";

import { dislikeRecipe } from "@/actions/recipe/dislike-recipe";
import { getSuggestedRecipes } from "@/actions/recipe/get-suggested-recipes";
import { likeRecipe } from "@/actions/recipe/like-recipe";
import { SwipeVariant } from "@/config/swipe-variant";
import type { RecipesContextType } from "@/contexts/recipes/context";
import { RecipesContext } from "@/contexts/recipes/context";
import type { SuggestedRecipe } from "@/types";
import { sleep } from "@/utils/sleep";

interface RecipesContextProviderProps {
  children: ReactNode;
  initialData: SuggestedRecipe[];
}

export const RecipesContextProvider = ({ children, initialData }: RecipesContextProviderProps) => {
  const [recipes, setRecipes] = useState(initialData.toReversed());
  const [isFetching, setIsFetching] = useState(false);
  const [swipeVariant, setSwipeVariant] = useState(SwipeVariant.Like);

  const fetchMore = async () => {
    setIsFetching(true);

    // Wait for swipe animation to finish (swipe animation -> 500 ms)
    const [newRecipes] = await Promise.all([getSuggestedRecipes(), sleep(500)]);

    setRecipes(newRecipes.toReversed());
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
      setSwipeVariant(SwipeVariant.Like);
      removeFromList(id);

      await likeRecipe(id).catch(() => toast.error("Could not like recipe"));
    },
    [removeFromList]
  );

  const dislike = useCallback(
    async (id: string) => {
      setSwipeVariant(SwipeVariant.Dislike);
      removeFromList(id);

      await dislikeRecipe(id).catch(() => toast.error("Could not dislike recipe"));
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
