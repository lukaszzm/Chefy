import { createContext } from "react";

import type { SwipeVariant } from "@/features/swipe";
import type { RecipeWithRelations } from "@/types";

export interface RecipesContextType {
  recipes: Array<RecipeWithRelations>;
  isFetching: boolean;
  like: (id: string) => void;
  dislike: (id: string) => void;
  swipeVariant: SwipeVariant;
  changeSwipeVariant: (variant: SwipeVariant) => void;
}

export const RecipesContext = createContext<RecipesContextType | undefined>(undefined);
