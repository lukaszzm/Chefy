import { createContext } from "react";

import type { SwipeVariant } from "@/config/swipe-variant";
import type { SuggestedRecipe } from "@/types";

export interface RecipesContextType {
  recipes: SuggestedRecipe[];
  isFetching: boolean;
  like: (id: string) => void;
  dislike: (id: string) => void;
  swipeVariant: SwipeVariant;
  changeSwipeVariant: (variant: SwipeVariant) => void;
}

export const RecipesContext = createContext<RecipesContextType | undefined>(undefined);
