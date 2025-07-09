import { toast } from "sonner";

import { signOut as signOutAction } from "@/features/auth/actions/sign-out";
import { useAction } from "@/hooks/use-action";

export function useSignOut() {
  const { execute, isPending } = useAction({
    action: signOutAction,
    onError: (error) => toast.error(error),
  });

  return {
    signOut: execute,
    isPending,
  };
}
