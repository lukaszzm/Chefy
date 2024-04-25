import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUp } from "@/features/auth/actions/sign-up";
import { signUpSchema, type SignUpPayload } from "@/features/auth/schemas/sign-up-schema";

export const useSignUp = () => {
  const [isPending, startTransition] = useTransition();
  const [credentialsError, setCredentialsError] = useState<string | null>(null);

  const form = useForm<SignUpPayload>({
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
