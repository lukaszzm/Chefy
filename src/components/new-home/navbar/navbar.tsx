import { SignInDialog } from "@/components/auth/sign-in/dialog";
import { Logo } from "@/components/ui/logo";

export const Navbar = () => {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-5">
      <Logo withText />
      <SignInDialog />
    </nav>
  );
};
