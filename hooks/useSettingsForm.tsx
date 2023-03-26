import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiResponse } from "@/interfaces";

interface InitialProps {
  schema?: z.AnyZodObject;
  defaultValues?: any;
}

export const useSettingsForm = <T extends FieldValues>(props: InitialProps) => {
  const { schema, defaultValues } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
    defaultValues: defaultValues,
  });
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const onSubmit = async (values: T) => {
    setApiResponse(null);
    const response = await fetch("/api/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok)
      return setApiResponse({
        isError: true,
        text: data.message || "Something went wrong.",
      });

    setApiResponse({
      isError: false,
      text: data.message || "Success! Your data has been changed. ",
    });
  };

  return {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    onSubmit,
    apiResponse,
  };
};
