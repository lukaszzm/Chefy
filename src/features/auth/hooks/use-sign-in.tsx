import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signIn } from "@/features/auth/actions/sign-in";
import { signInSchema, type SignInPayload } from "@/features/auth/schemas/sign-in-schema";
import { useAction } from "@/hooks/use-action";

export const useSignIn = () => {
  const form = useForm<SignInPayload>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
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
};
