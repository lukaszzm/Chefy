import type { SwipeDirection } from "@/features/discover/config/swipe";
import type { RecipeWithRelations } from "@/types";
import { createContext } from "react";

export interface DiscoverContextType {
  recipes: RecipeWithRelations[];
  pending: boolean;
  likeRecipe: (recipeId: string) => void;
  dislikeRecipe: (recipeId: string) => void;
  swipeDirection: SwipeDirection;
  changeSwipeDirection: (direction: SwipeDirection) => void;
}

export const DiscoverContext = createContext<DiscoverContextType | undefined>(undefined);
