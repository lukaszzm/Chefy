import { Button } from "@/components/UI/Button";
import { Logo } from "@/components/UI/new-logo";

export const Navbar = () => {
  return (
    <nav className="w-full flex justify-between p-5 max-w-7xl mx-auto items-center">
      <Logo withText />
      <Button size="lg" className="text-base">
        Sign In
      </Button>
    </nav>
  );
};
