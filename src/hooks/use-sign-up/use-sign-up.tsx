import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUp } from "@/actions/auth/sign-up";
import { signUpSchema, type SignUpValues } from "@/schemas/auth/sign-up-schema";

export const useSignUp = () => {
  const [isPending, startTransition] = useTransition();
  const [credentialsError, setCredentialsError] = useState<string | null>(null);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = form.handleSubmit((values) => {
    setCredentialsError(null);

    startTransition(async () => {
      const result = await signUp(values);

      if (result.error) {
        setCredentialsError(result.error);
      }
    });
  });

  return { form, onSubmit, credentialsError, isPending };
};
