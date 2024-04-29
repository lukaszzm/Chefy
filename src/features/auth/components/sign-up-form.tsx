"use client";

import { Button } from "@/components/new_ui/button";
import { ErrorAlert } from "@/components/new_ui/error-alert";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/new_ui/form";
import { Input } from "@/components/new_ui/input";
import { useSignUp } from "@/features/auth/hooks/use-sign-up";

export const SignUpForm = () => {
  const { form, onSubmit, isPending, error } = useSignUp();

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
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
                <Input placeholder="Enter your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorAlert error={error} />
        <Button className="w-full" isLoading={isPending}>
          Create An Account
        </Button>
      </form>
    </Form>
  );
};
