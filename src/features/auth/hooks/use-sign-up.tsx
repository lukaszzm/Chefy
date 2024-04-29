import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUp } from "@/features/auth/actions/sign-up";
import { signUpSchema, type SignUpPayload } from "@/features/auth/schemas/sign-up-schema";
import { useAction } from "@/hooks/use-action";

export const useSignUp = () => {
  const form = useForm<SignUpPayload>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { isPending, execute, error } = useAction({
    action: signUp,
  });

  const onSubmit = form.handleSubmit(execute);

  return { form, onSubmit, error, isPending };
};
