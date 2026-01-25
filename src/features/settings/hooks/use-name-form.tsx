import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateName } from "@/features/settings/actions/update-name";
import type { UpdateNamePayload } from "@/features/settings/schemas/name-schema";
import { generateNameSchema } from "@/features/settings/schemas/name-schema";
import { useAction } from "@/hooks/use-action";
import { useTranslations } from "next-intl";

export function useNameForm(defaultName?: string) {
  const t = useTranslations();

  const form = useForm<UpdateNamePayload>({
    resolver: zodResolver(generateNameSchema(t)),
    defaultValues: {
      name: defaultName ?? "",
    },
  });

  const { execute, isPending, error } = useAction({
    action: updateName,
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
}
