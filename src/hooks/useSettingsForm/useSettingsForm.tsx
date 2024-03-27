import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { DefaultValues, FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import type { ApiResponse } from "@/interfaces";
import { queryClient } from "@/lib/queryClient";
import { updateUser } from "@/queries/api/updateUser";

interface InitialProps<T extends FieldValues> {
  schema?: z.AnyZodObject;
  defaultValues?: DefaultValues<T>;
  refetchRecipes?: boolean;
}

export const useSettingsForm = <T extends FieldValues>(props: InitialProps<T>) => {
  const { schema, defaultValues, refetchRecipes } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
    defaultValues: defaultValues,
  });
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: (values: T) => updateUser(values),
    onMutate: () => {
      setApiResponse(null);
    },
    onSuccess: async (data) => {
      setApiResponse({
        isError: false,
        text: data.message || "Success! Your data has been changed. ",
      });

      if (refetchRecipes)
        queryClient.refetchQueries({
          queryKey: ["recipes"],
        });
    },
    onError: async (error) => {
      if (error instanceof Error)
        setApiResponse({
          isError: true,
          text: error.message || "Something went wrong.",
        });
    },
  });

  const submitFn = handleSubmit((values: T) => mutate(values));

  return {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    submitFn,
    isPending,
    apiResponse,
  };
};
