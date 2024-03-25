import { routes } from "@/config/routes";
import { ChefHat } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  withText?: boolean;
}

export const Logo = ({ withText }: LogoProps) => {
  return (
    <Link href={routes.home} className="flex gap-1 items-center">
      <ChefHat className="text-white bg-primary p-1 size-11 rounded-lg" />
      {withText && <span className="text-2xl font-semibold">Chefy</span>}
    </Link>
  );
};
