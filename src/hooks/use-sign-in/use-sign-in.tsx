import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import type { ApiResponse } from "@/interfaces";
import { signInSchema, type SignInValues } from "@/schemas/sign-in-schema";

export const useSignIn = () => {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const onSubmit = async (values: SignInValues) => {
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
    form,
    onSubmit,
    apiResponse,
  };
};
