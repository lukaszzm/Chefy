import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import type { Recipe } from "@/interfaces";
import { queryClient } from "@/lib/queryClient";
import { sendDislike } from "@/queries/api/sendDislike";
import { sendLike } from "@/queries/api/sendLike";

export const useRecipe = (recipeId: string) => {
  const [isShortVersion, setIsShortVersion] = useState(true);
  const [isLike, setIsLike] = useState(true);
  const [isError, setIsError] = useState(false);
  const mutation = useMutation({
    mutationFn: isLike ? sendLike : sendDislike,
    onMutate: async () => {
      queryClient.cancelQueries({
        queryKey: ["recipes"],
      });
      const snapshot = queryClient.getQueryData<Recipe[]>(["recipes"]);
      const newData = snapshot?.filter(({ id }) => id !== recipeId);
      queryClient.setQueryData<Recipe[]>(["recipes"], newData);
      if (newData && newData.length === 0)
        queryClient.invalidateQueries({
          queryKey: ["recipes"],
        });
      return { snapshot };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["recipes"], context?.snapshot);
      setIsError(true);
    },
  });

  const likeHandler = () => {
    setIsLike(true);
    mutation.mutate(recipeId);
  };

  const dislikeHandler = () => {
    setIsLike(false);
    mutation.mutate(recipeId);
  };

  return {
    isShortVersion,
    setIsShortVersion,
    likeHandler,
    dislikeHandler,
    isLike,
    setIsLike,
    isError,
    setIsError,
  };
};
