import { SignInDialog } from "@/components/auth/sign-in/dialog";
import { Logo } from "@/components/ui/new-logo";

export const Navbar = () => {
  return (
    <nav className="w-full flex justify-between p-5 max-w-7xl mx-auto items-center">
      <Logo withText />
      <SignInDialog />
    </nav>
  );
};
