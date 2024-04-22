import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import type { PreferencesValues, PreferenceValue } from "@/schemas/settings/preferences-schema";
import { preferencesSchema } from "@/schemas/settings/preferences-schema";
import type { ActionResponse } from "@/types";
import { mapToSelected } from "@/utils/map-to-selected";

interface UsePreferencesFormProps {
  allValues: Omit<PreferenceValue, "selected">[];
  preferredValues: Omit<PreferenceValue, "selected">[];
  keyName: string;
  actionOnSubmit: (values: string[]) => Promise<ActionResponse<string>>;
}

export const usePreferencesForm = ({
  allValues,
  preferredValues,
  keyName,
  actionOnSubmit,
}: UsePreferencesFormProps) => {
  const form = useForm<PreferencesValues>({
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
};
