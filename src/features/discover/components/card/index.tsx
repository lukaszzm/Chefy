"use client";

import { Card } from "@/components/ui/card";
import { DiscoverCardContent } from "@/features/discover/components/card/content";
import { DiscoverCardFooter } from "@/features/discover/components/card/footer";
import { DiscoverCardHeader } from "@/features/discover/components/card/header";
import { SwipeItem } from "@/features/discover/components/swipe-item";
import { useDiscover } from "@/features/discover/hooks/use-discover";
import { usePreviewMode } from "@/features/discover/hooks/use-preview-mode";
import type { Recipe } from "@/types";
import { useTranslations } from "next-intl";
import { useRef } from "react";

interface DiscoverCardProps extends Omit<Recipe, "category" | "area"> {
  categoryName: string;
  areaName: string;
  isTopCard?: boolean;
  zIndex?: number;
}

export function DiscoverCard({
  id,
  title,
  imageSrc,
  categoryName,
  areaName,
  ingredients,
  instructions,
  isTopCard = false,
  zIndex = 0,
}: DiscoverCardProps) {
  const t = useTranslations("discover.card");

  const cardRef = useRef<HTMLDivElement>(null);
  const { isPreviewMode, toggleMode, topRef } = usePreviewMode();
  const { likeRecipe, dislikeRecipe, swipeDirection, changeSwipeDirection } = useDiscover();

  return (
    <SwipeItem
      isDragEnabled={!isPreviewMode && isTopCard}
      direction={swipeDirection}
      onChangeSwipeDirection={changeSwipeDirection}
      onSwipeLeft={() => dislikeRecipe(id)}
      onSwipeRight={() => likeRecipe(id)}
      zIndex={zIndex}
    >
      <Card
        ref={cardRef}
        className="h-svh-without-nav sm:max-h-card-height focus-visible:ring-ring relative overflow-hidden rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-[preview=true]:overflow-auto sm:max-w-sm sm:rounded-xl"
        data-preview={isPreviewMode ? "true" : undefined}
        tabIndex={0}
        role="article"
        aria-label={t("ariaLabel", { title })}
      >
        <div className="absolute top-0" ref={topRef} />
        <DiscoverCardHeader imageSrc={imageSrc} title={title} priority={isTopCard} />
        <DiscoverCardContent
          areaName={areaName}
          categoryName={categoryName}
          ingredients={ingredients}
          instructions={instructions}
        />
        <DiscoverCardFooter id={id} isExpanded={isPreviewMode} title={title} onExpand={toggleMode} />
      </Card>
    </SwipeItem>
  );
}
