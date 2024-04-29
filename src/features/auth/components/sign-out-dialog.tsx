"use client";

import type { PropsWithChildren } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/new_ui/alert-dialog";
import { Button } from "@/components/new_ui/button";
import { useSignOut } from "@/features/auth/hooks/use-sign-out";

export const SignOutDialog = ({ children }: PropsWithChildren) => {
  const { signOut, isPending } = useSignOut();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign Out?</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to sign out of your account?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button isLoading={isPending} onClick={signOut}>
              Sign Out
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
