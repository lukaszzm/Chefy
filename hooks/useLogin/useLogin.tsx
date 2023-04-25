import type { ApiResponse } from "@/interfaces";
import { LoginSchema } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormInputs {
  email: string;
  password: string;
}

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const onSubmit = async (values: FormInputs) => {
    const { email, password } = values;
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (!response || !response.ok)
      setApiResponse({
        isError: true,
        text: response?.error || "Something went wrong.",
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
