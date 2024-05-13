"use client";

import { ActionError } from "@/components/ui/action-error";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsContainer } from "@/features/settings/components/settings-container";
import { usePasswordForm } from "@/features/settings/hooks/use-password-form";

export const UpdatePasswordForm = () => {
  const { form, onSubmit, isPending, error } = usePasswordForm();

  return (
    <SettingsContainer subtitle="Password">
      <Form {...form}>
        <form className="space-y-4" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ActionError error={error} />

          <Button className="w-full sm:w-auto" disabled={!form.formState.isDirty} isLoading={isPending} type="submit">
            Update Password
          </Button>
        </form>
      </Form>
    </SettingsContainer>
  );
};
