import { FoodOverlay } from "@/components/new-home/food-overlay";
import { Button } from "@/components/ui/Button";

export const Hero = () => {
  return (
    <main className="m-auto flex h-full w-full max-w-7xl items-center justify-center text-center">
      <div className="space-y-18 relative max-w-6xl p-16">
        <h1 className="mb-12 text-8xl font-bold">
          Welcome to our{" "}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">recipe</span> app!
        </h1>
        <h2 className="my-6 text-center text-lg font-semibold text-muted-foreground/80 lg:text-2xl">
          We&apos;re excited to help you discover new and delicious recipes with just a swipe of your finger. Our app is
          designed to make meal planning and cooking easy and fun, with a wide variety of recipes from all over the
          world.
        </h2>
        <Button className="px-12 py-8 text-xl" size="lg">
          Get Started Now!
        </Button>
        <FoodOverlay />
      </div>
    </main>
  );
};
