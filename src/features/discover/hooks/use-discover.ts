import { DiscoverContext } from "@/features/discover/context";
import { useContext } from "react";

export function useDiscover() {
  const context = useContext(DiscoverContext);

  if (!context) {
    throw new Error("useDiscover must be used within a DiscoverProvider");
  }

  return context;
}
