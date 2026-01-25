import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signIn } from "@/features/auth/actions/sign-in";
import { generateSignInSchema, type SignInPayload } from "@/features/auth/schemas/sign-in-schema";
import { useAction } from "@/hooks/use-action";
import { useTranslations } from "next-intl";

export function useSignIn() {
  const t = useTranslations();

  const form = useForm<SignInPayload>({
    resolver: zodResolver(generateSignInSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, isPending, error } = useAction({
    action: signIn,
  });

  const onSubmit = form.handleSubmit(execute);

  return {
    form,
    onSubmit,
    isPending,
    error,
  };
}
