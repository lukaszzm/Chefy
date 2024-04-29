import Link from "next/link";

import { Button } from "@/components/new_ui/button";
import { routes } from "@/config/routes";
import { FoodOverlay } from "@/features/home/components/food-overlay";

export const Hero = () => {
  return (
    <main className="m-auto flex h-full w-full max-w-7xl items-center justify-center text-center">
      <div className="relative max-w-6xl p-6 sm:p-16">
        <h1 className="mb-10 text-7xl font-bold sm:mb-16 sm:text-8xl">
          Welcome to our{" "}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">recipe</span> app!
        </h1>
        <p className="my-6 text-center text-lg font-semibold leading-7 text-muted-foreground sm:text-xl sm:leading-8 lg:text-2xl lg:leading-10">
          We&apos;re excited to help you discover new and delicious recipes with just a swipe of your finger. Our app is
          designed to make meal planning and cooking easy and fun, with a wide variety of recipes from all over the
          world.
        </p>
        <Button className="py-7 text-lg lg:px-12 lg:py-8 lg:text-xl" size="lg" asChild>
          <Link href={routes.signUp}>Get Started Now!</Link>
        </Button>
        <FoodOverlay />
      </div>
    </main>
  );
};
