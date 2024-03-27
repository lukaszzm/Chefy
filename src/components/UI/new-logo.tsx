import { ChefHat } from "lucide-react";
import Link from "next/link";

import { routes } from "@/config/routes";

interface LogoProps {
  withText?: boolean;
}

export const Logo = ({ withText }: LogoProps) => {
  return (
    <Link className="flex items-center gap-1" href={routes.home}>
      <ChefHat className="size-11 rounded-lg bg-primary p-1 text-white" />
      {withText && <span className="text-2xl font-semibold">Chefy</span>}
    </Link>
  );
};
