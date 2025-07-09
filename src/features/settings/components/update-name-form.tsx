"use client";

import { ActionError } from "@/components/ui/action-error";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsContainer } from "@/features/settings/components/settings-container";
import { SubmitButton } from "@/features/settings/components/submit-button";
import { useNameForm } from "@/features/settings/hooks/use-name-form";

interface UpdateNameFormProps {
  defaultName: string;
}

export function UpdateNameForm({ defaultName }: UpdateNameFormProps) {
  const { form, onSubmit, isPending, error } = useNameForm(defaultName);

  return (
    <SettingsContainer subtitle="General Info">
      <Form {...form}>
        <form className="space-y-4" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ActionError error={error} />
          <SubmitButton aria-label="Update Name" disabled={!form.formState.isDirty} isLoading={isPending} />
        </form>
      </Form>
    </SettingsContainer>
  );
}
