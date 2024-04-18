"use client";

import { ActionError } from "@/components/ui/action-error";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNameForm } from "@/hooks/use-name-form";

// TODO: add default name
export const NameForm = () => {
  const { form, onSubmit, isPending, error } = useNameForm();

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
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ActionError error={error} />

        <Button disabled={!form.formState.isValid} isLoading={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
