import { ApiRoutes } from "@/config/routes";
import type { RecipeWithRelations } from "@/types";

interface FetchMoreRecipesOptions {
  cursor?: string;
  excludeIds?: ReadonlyArray<string>;
}

export async function fetchMoreRecipes({ cursor, excludeIds }: FetchMoreRecipesOptions = {}): Promise<
  RecipeWithRelations[]
> {
  const url = new URL(ApiRoutes.Feed, window.location.origin);

  if (cursor) {
    url.searchParams.append("cursor", cursor);
  }

  if (excludeIds && excludeIds.length > 0) {
    url.searchParams.append("excludeIds", excludeIds.join(","));
  }

  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    throw new Error("Could not fetch more recipes");
  }

  const data = await res.json();
  return data;
}
