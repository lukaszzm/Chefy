import { useContext } from "react";

import { MenuContext } from "@/features/likes/contexts/menu/context";

export const useMenu = () => {
  const value = useContext(MenuContext);

  if (!value) {
    throw new Error("useMenu must be used within a MenuContextProvider");
  }

  return value;
};
