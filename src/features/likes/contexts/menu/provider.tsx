"use client";

import { useState } from "react";

import type { MenuContextType } from "@/features/likes/contexts/menu/context";
import { MenuContext } from "@/features/likes/contexts/menu/context";
import type { Recipe } from "@/types";

interface MenuContextProviderProps {
  recipe: Recipe;
  children: React.ReactNode;
}

export const MenuContextProvider = ({ children, recipe }: MenuContextProviderProps) => {
  const [isOpen, setIsMenuOpen] = useState(false);

  const value = {
    recipe,
    isOpen,
    changeMenuState: setIsMenuOpen,
  } as MenuContextType;

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
