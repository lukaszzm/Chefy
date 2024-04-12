"use client";

import { Heart, X } from "lucide-react";
import Image from "next/image";

import { RecipeBadges } from "@/components/recipe/recipe-badges";
import { Swiper } from "@/components/swiper";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter, CardContent } from "@/components/ui/card";
import { useRecipes } from "@/hooks/use-recipes";
import type { Recipe } from "@/types";

interface ExploreCardProps extends Omit<Recipe, "category" | "area"> {
  categoryName: string;
  areaName: string;
}

// TODO: Add Recipe information to the card
export const ExploreCard = ({ id, title, imageSrc, categoryName, areaName }: ExploreCardProps) => {
  const { like, dislike, swipeVariant, changeSwipeVariant } = useRecipes();

  return (
    <Swiper
      changeVariant={changeSwipeVariant}
      variant={swipeVariant}
      onSwipeLeft={() => dislike(id)}
      onSwipeRight={() => like(id)}
    >
      <Card className="flex h-full flex-col gap-4 rounded-none sm:h-auto sm:max-w-sm sm:rounded-xl">
        <CardHeader className="h-[410px] flex-none space-y-2">
          <Image
            alt={`Image of ${title}`}
            className="mx-auto rounded-xl"
            height={380}
            src={imageSrc}
            width={360}
            priority
          />

          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <RecipeBadges area={areaName} category={categoryName} />
        </CardContent>
        <CardFooter className="flex flex-none items-center justify-around p-8">
          <Button size="control" variant="destructive" onClick={() => dislike(id)}>
            <X size={44} />
          </Button>
          <Button size="control" variant="success" onClick={() => like(id)}>
            <Heart size={44} />
          </Button>
        </CardFooter>
      </Card>
    </Swiper>
  );
};
