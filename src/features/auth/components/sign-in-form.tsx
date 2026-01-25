"use client";

import { Button } from "@/components/ui/button";
import { ErrorAlert } from "@/components/ui/error-alert";
import { Form, FormLabel, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";
import { useTranslations } from "next-intl";

export function SignInForm() {
  const t = useTranslations("auth.form");

  const { form, onSubmit, isPending, error } = useSignIn();

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.email.label")}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t("fields.email.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.password.label")}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t("fields.password.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorAlert error={error} />
        <Button className="w-full" isLoading={isPending}>
          {t("submit.signIn")}
        </Button>
      </form>
    </Form>
  );
}
