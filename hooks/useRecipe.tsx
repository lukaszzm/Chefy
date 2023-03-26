import type { ApiResponse } from "@/interfaces";
import { useState } from "react";

export const useRecipe = (recipeId: string, refetchFn: () => void) => {
  const [isShortVersion, setIsShortVersion] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const likeHandler = async () =>
    await sendRequest(`/api/recipes/likes/${recipeId}`);

  const dislikeHandler = async () =>
    await sendRequest(`/api/recipes/dislikes/${recipeId}`);

  const sendRequest = async (url: string) => {
    setIsSubmitting(true);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsSubmitting(false);

    if (!response.ok) {
      console.log(recipeId);
      console.log(await response.json());
      return setApiResponse({ isError: true, text: "Something went wrong." });
    }

    refetchFn();
  };

  return {
    isShortVersion,
    setIsShortVersion,
    isSubmitting,
    apiResponse,
    likeHandler,
    dislikeHandler,
  };
};
