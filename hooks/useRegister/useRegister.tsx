import { ApiResponse } from "@/interfaces";
import { registerUser } from "@/queries/api/registerUser";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormInputs>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const { mutate, isLoading } = useMutation({
    mutationFn: (values: FormInputs) => registerUser(values),
    onMutate: () => {
      setApiResponse(null);
    },
    onSuccess: async (data, variables) => {
      setApiResponse({
        isError: false,
        text: "Registered successfully! Logging in...",
      });
      signIn("credentials", {
        email: variables.email,
        password: variables.password,
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

  const submitFn = handleSubmit((values) => mutate(values));

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isDirty,
    isLoading,
    submitFn,
    apiResponse,
  };
};
