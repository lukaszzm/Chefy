import { ApiRoutes } from "@/config/routes";
import { slugRoute } from "@/utils/slug-route";

export async function likeRecipe(recipeId: string): Promise<void> {
  const urlWithRecipeId = slugRoute(ApiRoutes.LikeRecipe, { id: recipeId });
  const res = await fetch(urlWithRecipeId, { method: "POST" });

  if (!res.ok) {
    throw new Error("Could not like recipe");
  }
}
