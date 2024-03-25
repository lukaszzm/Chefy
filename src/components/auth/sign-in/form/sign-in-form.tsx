"use client";

import { useSignIn } from "@/hooks/use-sign-in";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CredentialsInfo } from "@/components/auth/credentials-info";

export const SignInForm = () => {
  const { form, apiResponse } = useSignIn();
  const {
    control,
    formState: { isValid, isDirty, isSubmitting },
  } = form;

  return (
    <div className="space-y-4">
      <Form {...form}>
        <FormField
          control={control}
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
          control={control}
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
        {apiResponse && (
          <Alert variant="destructive">
            <AlertDescription>{apiResponse.text}</AlertDescription>
          </Alert>
        )}
        <Button disabled={!isValid || !isDirty} className="w-full">
          Submit
        </Button>
      </Form>
      <Separator />
      <CredentialsInfo onClick={() => {}} variant="sign-in" />
    </div>
  );
};
