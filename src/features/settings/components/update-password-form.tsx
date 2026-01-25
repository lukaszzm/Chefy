"use client";

import { ActionError } from "@/components/ui/action-error";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsContainer } from "@/features/settings/components/settings-container";
import { SubmitButton } from "@/features/settings/components/submit-button";
import { usePasswordForm } from "@/features/settings/hooks/use-password-form";
import { useTranslations } from "next-intl";

export function UpdatePasswordForm() {
  const t = useTranslations("settings.general.password");

  const { form, onSubmit, isPending, error } = usePasswordForm();

  return (
    <SettingsContainer subtitle={t("subtitle")}>
      <Form {...form}>
        <form className={"space-y-4"} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("currentPassword.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("currentPassword.placeholder")} type="password" {...field} />
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
                <FormLabel>{t("newPassword.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("newPassword.placeholder")} type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ActionError error={error} />
          <SubmitButton aria-label={t("submit")} disabled={!form.formState.isDirty} isLoading={isPending} />
        </form>
      </Form>
    </SettingsContainer>
  );
}
