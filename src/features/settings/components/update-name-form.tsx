"use client";

import { ActionError } from "@/components/ui/action-error";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsContainer } from "@/features/settings/components/settings-container";
import { SubmitButton } from "@/features/settings/components/submit-button";
import { useNameForm } from "@/features/settings/hooks/use-name-form";
import { useTranslations } from "next-intl";

interface UpdateNameFormProps {
  defaultName: string;
}

export function UpdateNameForm({ defaultName }: UpdateNameFormProps) {
  const t = useTranslations("settings.general.name");

  const { form, onSubmit, isPending, error } = useNameForm(defaultName);

  return (
    <SettingsContainer subtitle={t("subtitle")}>
      <Form {...form}>
        <form className="space-y-4" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholder")} {...field} />
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
