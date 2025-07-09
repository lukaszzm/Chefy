"use client";

import { ActionError } from "@/components/ui/action-error";
import { BadgeCheckbox } from "@/components/ui/badge-checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SubmitButton } from "@/features/settings/components/submit-button";
import { usePreferencesForm } from "@/features/settings/hooks/use-preferences-form";
import type { PreferenceValue } from "@/features/settings/schemas/preferences-schema";
import type { ActionResponse } from "@/types";

interface UpdatePreferencesFormProps {
  allValues: PreferenceValue[];
  preferredValues: PreferenceValue[];
  keyName: string;
  actionOnSubmit: (values: string[]) => Promise<ActionResponse<string>>;
  submitText: string;
}

export function UpdatePreferencesForm({
  allValues,
  preferredValues,
  keyName,
  actionOnSubmit,
  submitText,
}: UpdatePreferencesFormProps) {
  const { form, fields, onSubmit, error, isPending } = usePreferencesForm({
    allValues,
    preferredValues,
    keyName,
    actionOnSubmit,
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={onSubmit}>
        <fieldset className="flex flex-1 flex-wrap gap-2">
          {fields.map((arrayField, index) => {
            return (
              <FormField
                control={form.control}
                key={arrayField.id}
                name={`values.${index}.selected`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <BadgeCheckbox
                        {...field}
                        defaultChecked={field.value}
                        label={arrayField.name}
                        value={field.value ? "true" : undefined}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            );
          })}
        </fieldset>
        <ActionError error={error} />
        <SubmitButton aria-label={submitText} disabled={!form.formState.isDirty} isLoading={isPending} />
      </form>
    </Form>
  );
}
