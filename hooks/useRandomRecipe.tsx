import { fetcher } from "@/lib/fetcher";
import useSWR, { useSWRConfig } from "swr";
import type { Recipe } from "@/interfaces";

export const useRandomRecipe = () => {
  const { data, error, isValidating } = useSWR<Recipe, Error>(
    "/api/recipes/random",
    fetcher
  );
  const { mutate } = useSWRConfig();

  const refetchData = () => {
    mutate("/api/recipes/random");
  };

  return { data, error, isValidating, refetchData };
};
