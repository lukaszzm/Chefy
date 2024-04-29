import { useTransition } from "react";

import { toast } from "sonner";

import { signOut as signOutAction } from "@/features/auth/actions/sign-out";

export const useSignOut = () => {
  const [isPending, startTransition] = useTransition();

  const signOut = () => {
    startTransition(async () => {
      const res = await signOutAction();

      if (res.error) {
        toast.error(res.error);
      }
    });
  };

  return {
    isPending,
    signOut,
  };
};
