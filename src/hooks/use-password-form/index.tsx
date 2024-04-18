import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updatePassword } from "@/actions/user/update-password";
import { useAction } from "@/hooks/use-action";
import type { ChangePasswordValues } from "@/schemas/settings/password-schema";
import { changePasswordSchema } from "@/schemas/settings/password-schema";

export const usePasswordForm = () => {
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const { execute, isPending, error } = useAction({
    action: updatePassword,
    onSuccess: (data) => toast.success(data),
    refreshOnSuccess: false,
  });

  const onSubmit = form.handleSubmit(execute);

  return {
    form,
    onSubmit,
    isPending,
    error,
  };
};
