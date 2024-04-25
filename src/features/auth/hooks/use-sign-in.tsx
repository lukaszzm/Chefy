import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signIn } from "@/features/auth/actions/sign-in";
import { signInSchema, type SignInPayload } from "@/features/auth/schemas/sign-in-schema";

export const useSignIn = () => {
  const [isPending, startTransition] = useTransition();
  const [credentialsError, setCredentialsError] = useState<string | null>(null);

  const form = useForm<SignInPayload>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setCredentialsError(null);

    startTransition(async () => {
      const res = await signIn(values);

      if (res.error) {
        setCredentialsError(res.error);
      }
    });
  });

  return {
    form,
    onSubmit,
    isPending,
    credentialsError,
  };
};
