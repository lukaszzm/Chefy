"use client";

import { Card } from "@/components/ui/card";
import { ExploreCardContent } from "@/features/explore/components/card/card-content";
import { ExploreCardFooter } from "@/features/explore/components/card/card-footer";
import { ExploreCardHeader } from "@/features/explore/components/card/card-header";
import { SwipeItem } from "@/features/explore/components/swipe-item";
import { usePreviewMode } from "@/features/explore/hooks/use-preview-mode";
import { useRecipes } from "@/features/explore/hooks/use-recipes";
import type { Recipe } from "@/types";

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
    <SwipeItem
      changeVariant={changeSwipeVariant}
      isDragEnabled={!isPreviewMode}
      variant={swipeVariant}
      onSwipeLeft={() => dislike(id)}
      onSwipeRight={() => like(id)}
    >
      <Card
        className="h-svh-without-nav sm:max-h-card-height relative overflow-hidden rounded-none data-[preview=true]:overflow-auto sm:max-w-sm sm:rounded-xl"
        data-preview={isPreviewMode ? "true" : undefined}
      >
        <div className="absolute top-0" ref={topRef} />
        <ExploreCardHeader imageSrc={imageSrc} title={title} />
        <ExploreCardContent
          areaName={areaName}
          categoryName={categoryName}
          ingredients={ingredients}
          instructions={instructions}
        />
        <ExploreCardFooter id={id} isExpanded={isPreviewMode} title={title} onExpand={toggleMode} />
      </Card>
    </SwipeItem>
  );
};
