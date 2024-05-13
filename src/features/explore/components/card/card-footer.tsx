import { ChevronDown, Heart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useRecipes } from "@/features/explore/hooks/use-recipes";
import type { Recipe } from "@/types";
import { cn } from "@/utils/cn";

interface ExploreCardFooterProps extends Pick<Recipe, "id" | "title"> {
  onExpand: (expand: boolean) => void;
  isExpanded: boolean;
}

export const ExploreCardFooter = ({ id, title, onExpand, isExpanded }: ExploreCardFooterProps) => {
  const { dislike, like } = useRecipes();

  return (
    <CardFooter
      className={cn(
        "bottom-0 flex w-full justify-around gap-6  bg-gradient-to-b from-transparent from-5% via-popover/90 to-popover p-6 transition-all duration-200",
        isExpanded ? "relative" : "absolute"
      )}
    >
      <Button aria-label={`Dislike ${title}`} size="control" variant="destructive" onClick={() => dislike(id)}>
        <X size={44} />
      </Button>
      <Button
        aria-label={isExpanded ? `Collapse information about ${title}` : `Expand information about ${title}`}
        className="size-14 self-end [&[data-expanded=true]>svg]:rotate-180"
        data-expanded={isExpanded ? "true" : "false"}
        size="control"
        variant="info"
        onClick={() => onExpand(!isExpanded)}
      >
        <ChevronDown className="shrink-0 transition-transform duration-200" size={32} />
      </Button>
      <Button aria-label={`Like ${title}`} size="control" variant="success" onClick={() => like(id)}>
        <Heart size={44} />
      </Button>
    </CardFooter>
  );
};
