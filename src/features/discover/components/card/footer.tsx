import { ChevronDown, Heart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import type { Recipe } from "@/types";
import { cn } from "@/utils/cn";
import { useDiscover } from "@/features/discover/hooks/use-discover";

interface DiscoverCardFooterProps extends Pick<Recipe, "id" | "title"> {
  onExpand: (expand: boolean) => void;
  isExpanded: boolean;
}

export function DiscoverCardFooter({ id, title, onExpand, isExpanded }: DiscoverCardFooterProps) {
  const { dislikeRecipe, likeRecipe } = useDiscover();

  return (
    <CardFooter
      className={cn(
        "via-popover/90 to-popover bottom-0 flex w-full justify-around gap-6 bg-linear-to-b from-transparent from-5% p-6 transition-all duration-200",
        isExpanded ? "relative" : "absolute"
      )}
    >
      <Button aria-label={`Dislike ${title}`} size="control" variant="destructive" onClick={() => dislikeRecipe(id)}>
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
      <Button aria-label={`Like ${title}`} size="control" variant="success" onClick={() => likeRecipe(id)}>
        <Heart size={44} />
      </Button>
    </CardFooter>
  );
}
