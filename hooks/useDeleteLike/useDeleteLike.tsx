import { ApiResponse } from "@/interfaces";
import { deleteLike } from "@/queries/api/deleteLike";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export const useDeleteLike = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const router = useRouter();
  const { asPath } = router;
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (id: string) => deleteLike(id),
    onSuccess: () => {
      setApiResponse({
        isError: false,
        text: "Recipe deleted. Redirecting...",
      });
      router.replace(asPath);
    },
    onError: () => {
      setApiResponse({ isError: true, text: "Something went wrong." });
    },
    onMutate: () => {
      setApiResponse(null);
    },
  });

  return {
    apiResponse,
    isPending,
    isSuccess,
    mutate,
  };
};
