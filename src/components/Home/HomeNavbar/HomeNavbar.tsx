import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/OLD_UI/Logo";

interface HomeNavbarProps {
  openLoginModal: () => void;
}

export const HomeNavbar = ({ openLoginModal }: HomeNavbarProps) => {
  return (
    <nav className="mx-auto flex w-full max-w-5xl items-center justify-between justify-self-start px-6 text-xl font-medium">
      <Logo />
      <Button variant="primary" onClick={openLoginModal}>
        Login
      </Button>
    </nav>
  );
};
