import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import type { UpdatePreferencesPayload, PreferenceValue } from "@/features/settings/schemas/preferences-schema";
import { preferencesSchema } from "@/features/settings/schemas/preferences-schema";
import { mapToSelected } from "@/features/settings/utils/map-to-selected";
import { useAction } from "@/hooks/use-action";
import type { ActionResponse } from "@/types";

interface UsePreferencesFormProps {
  allValues: PreferenceValue[];
  preferredValues: PreferenceValue[];
  keyName: string;
  actionOnSubmit: (values: string[]) => Promise<ActionResponse<string>>;
}

export function usePreferencesForm({ allValues, preferredValues, keyName, actionOnSubmit }: UsePreferencesFormProps) {
  const form = useForm<UpdatePreferencesPayload>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: { values: mapToSelected(allValues, preferredValues) },
  });

  const { fields } = useFieldArray({
    name: "values",
    keyName: keyName,
    control: form.control,
  });

  const { execute, isPending, error } = useAction({
    action: actionOnSubmit,
    onSuccess: (data) => toast.success(data),
    refreshOnSuccess: false,
  });

  const onSubmit = form.handleSubmit((data) => {
    const selectedIds: string[] = [];

    data.values.forEach((category) => {
      if (category.selected) {
        selectedIds.push(category.id);
      }
    });

    execute(selectedIds);
  });

  return {
    form,
    fields,
    isPending,
    error,
    onSubmit,
  };
}
