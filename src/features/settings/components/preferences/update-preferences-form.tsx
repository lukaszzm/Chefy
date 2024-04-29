"use client";

import { ActionError } from "@/components/ui/action-error";
import { BadgeCheckbox } from "@/components/ui/badge-checkbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { usePreferencesForm } from "@/features/settings/hooks/use-preferences-form";
import type { PreferenceValue } from "@/features/settings/schemas/preferences-schema";
import type { ActionResponse } from "@/types";

interface UpdatePreferencesFormProps {
  allValues: Array<PreferenceValue>;
  preferredValues: Array<PreferenceValue>;
  keyName: string;
  actionOnSubmit: (values: string[]) => Promise<ActionResponse<string>>;
}

export const UpdatePreferencesForm = ({
  allValues,
  preferredValues,
  keyName,
  actionOnSubmit,
}: UpdatePreferencesFormProps) => {
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

        <Button disabled={!form.formState.isDirty} isLoading={isPending} type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};
