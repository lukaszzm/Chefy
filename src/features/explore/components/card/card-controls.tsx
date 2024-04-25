import { ChevronDown, Heart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useRecipes } from "@/features/explore/hooks/use-recipes";
import type { Recipe } from "@/types";
import { cn } from "@/utils/cn";

interface ExploreCardControlsProps extends Pick<Recipe, "id"> {
  onExpand: (expand: boolean) => void;
  isExpanded: boolean;
}

export const ExploreCardControls = ({ id, onExpand, isExpanded }: ExploreCardControlsProps) => {
  const { dislike, like } = useRecipes();

  return (
    <CardFooter
      className={cn(
        "bottom-0 flex w-full justify-around gap-6  bg-gradient-to-b from-transparent from-5% via-popover/90 to-popover p-6 transition-all duration-200",
        isExpanded ? "relative" : "absolute"
      )}
    >
      <Button size="control" variant="destructive" onClick={() => dislike(id)}>
        <X size={44} />
      </Button>
      <Button
        className="size-14 self-end [&[data-state=expanded]>svg]:rotate-180"
        data-state={isExpanded ? "expanded" : undefined}
        size="control"
        variant="info"
        onClick={() => onExpand(!isExpanded)}
      >
        <ChevronDown className="shrink-0 transition-transform duration-200" size={32} />
      </Button>
      <Button size="control" variant="success" onClick={() => like(id)}>
        <Heart size={44} />
      </Button>
    </CardFooter>
  );
};
