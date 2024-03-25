import { Button } from "@/components/UI/Button";
import { FoodOverlay } from "../food-overlay";

export const Hero = () => {
  return (
    <main className="w-full h-full m-auto flex items-center justify-center text-center max-w-7xl">
      <div className="max-w-6xl p-16 space-y-18 relative">
        <h1 className="text-8xl font-bold mb-12">
          Welcome to our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
            recipe
          </span>{" "}
          app!
        </h1>
        <h2 className="text-lg text-center font-semibold lg:text-2xl text-muted-foreground/80 my-6">
          We&apos;re excited to help you discover new and delicious recipes with
          just a swipe of your finger. Our app is designed to make meal planning
          and cooking easy and fun, with a wide variety of recipes from all over
          the world.
        </h2>
        <Button size="lg" className="text-xl py-8 px-12">
          Get Started Now!
        </Button>
        <FoodOverlay />
      </div>
    </main>
  );
};
