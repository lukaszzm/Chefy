import { useCallback, useTransition } from "react";

import { toast } from "sonner";

import { signOut as signOutAction } from "@/features/auth/actions/sign-out";

export function useSignOut() {
  const [isPending, startTransition] = useTransition();

  const signOut = useCallback(() => {
    startTransition(async () => {
      const res = await signOutAction();

      if (res.error) {
        toast.error(res.error);
      }
    });
  }, []);

  return {
    isPending,
    signOut,
  };
}
