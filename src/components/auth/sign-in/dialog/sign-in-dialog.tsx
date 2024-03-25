import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignInForm } from "@/components/auth/sign-in/form";

export const SignInDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="text-base">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
};
