import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUpSchema, type SignUpValues } from "@/schemas/auth/sign-up-schema";

// TODO: implement sign up logic
export const useSignUp = () => {
  return useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });
};
