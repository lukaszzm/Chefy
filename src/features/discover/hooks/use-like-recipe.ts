import { likeRecipe } from "@/features/discover/api/like-recipe";
import { useMutation } from "@tanstack/react-query";

interface UseLikeRecipeOptions {
  onMutate?: (recipeId: string) => void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onSettled?: (data: unknown, error: unknown, recipeId: string) => void;
}

export function useLikeRecipe(options?: UseLikeRecipeOptions) {
  return useMutation({
    mutationFn: likeRecipe,
    ...options,
  });
}
