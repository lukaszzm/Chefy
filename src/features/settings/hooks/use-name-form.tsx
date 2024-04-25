import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateName } from "@/features/settings/actions/update-name";
import type { UpdateNamePayload } from "@/features/settings/schemas/name-schema";
import { nameSchema } from "@/features/settings/schemas/name-schema";
import { useAction } from "@/hooks/use-action";

export const useNameForm = (defaultName?: string) => {
  const form = useForm<UpdateNamePayload>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: defaultName ?? "",
    },
  });

  const { execute, isPending, error } = useAction({
    action: updateName,
    onSuccess: (data) => toast.success(data),
  });

  const onSubmit = form.handleSubmit(execute);

  return {
    form,
    onSubmit,
    isPending,
    error,
  };
};
