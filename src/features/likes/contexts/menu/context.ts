import { createContext } from "react";

import type { Recipe } from "@/types";

export interface MenuContextType {
  recipe: Recipe;
  isOpen: boolean;
  changeMenuState: (val: boolean) => void;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);
