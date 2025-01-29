"use client";

import { AnimatePresence } from "motion/react";

import { ExploreCard } from "@/features/explore/components/card";
import { ExploreLoading } from "@/features/explore/components/loading";
import { ExploreNotFound } from "@/features/explore/components/not-found";
import { useRecipes } from "@/features/explore/hooks/use-recipes";

export const ExploreStack = () => {
  const { recipes, isFetching } = useRecipes();

  return (
    <AnimatePresence>
      {recipes.length > 0 ? (
        recipes.map(({ recipe, category, area }) => (
          <ExploreCard areaName={area.name} categoryName={category.name} key={recipe.id} {...recipe} />
        ))
      ) : isFetching ? (
        <ExploreLoading />
      ) : (
        <ExploreNotFound />
      )}
    </AnimatePresence>
  );
};
