import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUp } from "@/features/auth/actions/sign-up";
import { useAction } from "@/hooks/use-action";
import { useTranslations } from "next-intl";
import type { SignUpPayload } from "@/features/auth/schemas/sign-up-schema";
import { generateSignUpSchema } from "@/features/auth/schemas/sign-up-schema";

export function useSignUp() {
  const t = useTranslations();

  const form = useForm<SignUpPayload>({
    resolver: zodResolver(generateSignUpSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isPending, execute, error } = useAction({
    action: signUp,
  });

  const onSubmit = form.handleSubmit(execute);

  return { form, onSubmit, error, isPending };
}
