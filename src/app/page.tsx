import type { Metadata } from "next";

import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import { Hero, Navbar } from "@/features/home";
import { validateRequest } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Chefy - Swipe, cook, love!",
};

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
