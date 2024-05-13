"use client";

import { ActionError } from "@/components/ui/action-error";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsContainer } from "@/features/settings/components/settings-container";
import { useNameForm } from "@/features/settings/hooks/use-name-form";

interface UpdateNameFormProps {
  defaultName: string;
}

export const UpdateNameForm = ({ defaultName }: UpdateNameFormProps) => {
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

          <Button
            className="w-full min-w-32 sm:w-auto"
            disabled={!form.formState.isDirty}
            isLoading={isPending}
            type="submit"
          >
            Update Name
          </Button>
        </form>
      </Form>
    </SettingsContainer>
  );
};
