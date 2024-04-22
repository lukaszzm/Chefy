import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateName } from "@/actions/user/update-name";
import { useAction } from "@/hooks/use-action";
import { changeNameSchema, type ChangeNameValues } from "@/schemas/settings/name-schema";

export const useNameForm = (defaultName?: string) => {
  const form = useForm<ChangeNameValues>({
    resolver: zodResolver(changeNameSchema),
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
