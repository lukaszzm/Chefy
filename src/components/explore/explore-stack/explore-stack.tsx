"use client";

import { AnimatePresence } from "framer-motion";

import { ExploreCard } from "@/components/explore/explore-card";
import { ExploreLoading } from "@/components/explore/explore-loading";
import { ExploreNotFound } from "@/components/explore/explore-not-found";
import { useRecipes } from "@/hooks/use-recipes";

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
