"use client";

import { Button } from "@/components/new_ui/button";
import { ErrorAlert } from "@/components/new_ui/error-alert";
import { Form, FormLabel, FormField, FormItem, FormControl, FormMessage } from "@/components/new_ui/form";
import { Input } from "@/components/new_ui/input";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";

export const SignInForm = () => {
  const { form, onSubmit, isPending, error } = useSignIn();

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorAlert error={error} />
        <Button className="w-full" isLoading={isPending}>
          Sign In
        </Button>
      </form>
    </Form>
  );
};
