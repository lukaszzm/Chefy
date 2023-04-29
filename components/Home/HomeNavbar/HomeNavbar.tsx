import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

interface IHomeNavbarProps {
  openLoginModal: () => void;
}

export const HomeNavbar: React.FC<IHomeNavbarProps> = ({ openLoginModal }) => {
  return (
    <nav className="w-full mx-auto justify-self-start px-6 max-w-5xl flex items-center justify-between font-medium text-xl">
      <Logo />
      <Button variant="primary" onClick={openLoginModal}>
        Login
      </Button>
    </nav>
  );
};
