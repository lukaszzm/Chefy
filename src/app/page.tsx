import { redirect } from "next/navigation";

import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/home/navbar";
import { routes } from "@/config/routes";
import { validateRequest } from "@/lib/auth";

export default async function HomePage() {
  const { user } = await validateRequest();

  if (user) {
    return redirect(routes.explore);
  }

  return (
    <div className="flex min-h-screen flex-col gap-4">
      <Navbar />
      <Hero />
    </div>
  );
}
