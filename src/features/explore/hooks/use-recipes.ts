import { useContext } from "react";

import { RecipesContext } from "@/features/explore/contexts/recipes/context";

export function useRecipes() {
  const context = useContext(RecipesContext);

  if (!context) {
    throw new Error("useRecipes must be used within a RecipesContextProvider");
  }

  return context;
}
