import { ApiRoutes } from "@/config/routes";
import { slugRoute } from "@/utils/slug-route";

export async function dislikeRecipe(recipeId: string): Promise<void> {
  const urlWithRecipeId = slugRoute(ApiRoutes.DislikeRecipe, { id: recipeId });
  const res = await fetch(urlWithRecipeId, { method: "POST" });

  if (!res.ok) {
    throw new Error("Could not dislike recipe");
  }
}
