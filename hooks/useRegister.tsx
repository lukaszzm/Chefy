import { ApiResponse } from "@/interfaces";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormInputs {
  email: string;
  name: string;
  password: string;
}

export const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const onSubmit = async (values: FormInputs) => {
    setApiResponse(null);
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok)
      return setApiResponse({ isError: true, text: data.message });

    setApiResponse({
      isError: false,
      text: data.message,
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    onSubmit,
    apiResponse,
  };
};
