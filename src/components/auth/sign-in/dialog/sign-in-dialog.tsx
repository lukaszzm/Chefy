import { SignInForm } from "@/components/auth/sign-in/form";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const SignInDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-base" size="lg">
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
