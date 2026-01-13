import { dislikeRecipe } from "@/features/discover/api/dislike-recipe";
import { useMutation } from "@tanstack/react-query";

interface UseDislikeRecipeOptions {
  onMutate?: (recipeId: string) => void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onSettled?: (data: unknown, error: unknown, recipeId: string) => void;
}

export function useDislikeRecipe(options?: UseDislikeRecipeOptions) {
  return useMutation({
    mutationFn: dislikeRecipe,
    ...options,
  });
}
