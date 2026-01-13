"use client";

import { AnimatePresence } from "motion/react";
import { useMemo } from "react";

import { DiscoverCard } from "@/features/discover/components/card";
import { DiscoverLoading } from "@/features/discover/components/loading";
import { DiscoverNotFound } from "@/features/discover/components/not-found";
import { useDiscover } from "@/features/discover/hooks/use-discover";
import { VISIBLE_CARDS_LIMIT } from "@/features/discover/config/visibility";

export function DiscoverStack() {
  const { recipes, pending } = useDiscover();

  const visibleRecipes = useMemo(() => recipes.slice(-VISIBLE_CARDS_LIMIT), [recipes]);

  return (
    <AnimatePresence mode="popLayout">
      {visibleRecipes.length > 0 ? (
        visibleRecipes.map(({ recipe, category, area }, index) => (
          <DiscoverCard
            key={recipe.id}
            zIndex={index}
            areaName={area.name}
            categoryName={category.name}
            isTopCard={index === visibleRecipes.length - 1}
            {...recipe}
          />
        ))
      ) : pending ? (
        <DiscoverLoading />
      ) : (
        <DiscoverNotFound />
      )}
    </AnimatePresence>
  );
}
