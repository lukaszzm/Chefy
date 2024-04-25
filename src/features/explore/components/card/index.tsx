"use client";

import Image from "next/image";

import { RecipeBadges } from "@/components/recipe/recipe-badges";
import { RecipeIngredients } from "@/components/recipe/recipe-ingredients";
import { RecipeSubtitle } from "@/components/recipe/recipe-subtitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExploreCardControls } from "@/features/explore/components/card/card-controls";
import { usePreviewMode } from "@/features/explore/hooks/use-preview-mode";
import { useRecipes } from "@/features/explore/hooks/use-recipes";
import { Swiper } from "@/features/swipe";
import type { Recipe } from "@/types";
import { cn } from "@/utils/cn";

interface ExploreCardProps extends Omit<Recipe, "category" | "area"> {
  categoryName: string;
  areaName: string;
}

export const ExploreCard = ({
  id,
  title,
  imageSrc,
  categoryName,
  areaName,
  ingredients,
  instructions,
}: ExploreCardProps) => {
  const { isPreviewMode, toggleMode, topRef } = usePreviewMode();
  const { like, dislike, swipeVariant, changeSwipeVariant } = useRecipes();

  return (
    <Swiper
      changeVariant={changeSwipeVariant}
      isDragEnabled={!isPreviewMode}
      variant={swipeVariant}
      onSwipeLeft={() => dislike(id)}
      onSwipeRight={() => like(id)}
    >
      <Card
        className={cn(
          "relative h-full max-h-screenWithoutNav overflow-auto rounded-none sm:max-h-[550px] sm:max-w-sm sm:rounded-xl",
          isPreviewMode ? "overflow-auto" : "overflow-hidden"
        )}
      >
        <div className="absolute top-0" ref={topRef} />
        <CardHeader className="mb-4 flex-none space-y-2">
          <Image
            alt={`Image of ${title}`}
            className="mx-auto rounded-xl border border-border"
            height={380}
            src={imageSrc}
            width={360}
            priority
          />

          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 space-y-2">
          <RecipeBadges area={areaName} category={categoryName} />
          <RecipeSubtitle>Ingredients</RecipeSubtitle>
          <RecipeIngredients ingredients={ingredients} />
          <RecipeSubtitle>Instructions</RecipeSubtitle>
          <p>{instructions}</p>
        </CardContent>

        <ExploreCardControls id={id} isExpanded={isPreviewMode} onExpand={toggleMode} />
      </Card>
    </Swiper>
  );
};
