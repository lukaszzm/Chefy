import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updatePassword } from "@/features/settings/actions/update-password";
import type { UpdatePasswordPayload } from "@/features/settings/schemas/password-schema";
import { generatePasswordSchema } from "@/features/settings/schemas/password-schema";
import { useAction } from "@/hooks/use-action";
import { useTranslations } from "next-intl";

export function usePasswordForm() {
  const t = useTranslations();

  const form = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(generatePasswordSchema(t)),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const { execute, isPending, error } = useAction({
    action: updatePassword,
    onSuccess: (data) => toast.success(data),
  });

  const onSubmit = form.handleSubmit(execute);

  return {
    form,
    onSubmit,
    isPending,
    error,
  };
}
