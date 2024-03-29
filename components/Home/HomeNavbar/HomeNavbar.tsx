import { Button } from "@/components/UI/Button";
import { Logo } from "@/components/UI/Logo";

interface HomeNavbarProps {
  openLoginModal: () => void;
}

export const HomeNavbar = ({ openLoginModal }: HomeNavbarProps) => {
  return (
    <nav className="w-full mx-auto justify-self-start px-6 max-w-5xl flex items-center justify-between font-medium text-xl">
      <Logo />
      <Button variant="primary" onClick={openLoginModal}>
        Login
      </Button>
    </nav>
  );
};
