"use client";

import { ActionError } from "@/components/ui/action-error";
import { BadgeCheckbox } from "@/components/ui/badge-checkbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { usePreferencesForm } from "@/hooks/use-preferences-form";
import type { PreferenceValue } from "@/schemas/settings/preferences-schema";
import type { ActionResponse } from "@/types";

interface PreferencesFormProps {
  defaultData: PreferenceValue[];
  keyName: string;
  actionOnSubmit: (values: string[]) => Promise<ActionResponse<string>>;
}

export const PreferencesForm = ({ defaultData, keyName, actionOnSubmit }: PreferencesFormProps) => {
  const { form, fields, onSubmit, error, isPending } = usePreferencesForm({
    defaultData,
    keyName,
    actionOnSubmit,
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
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
