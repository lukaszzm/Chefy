import { FoodIcons } from "@/components/Home/FoodIcons";

interface WelcomeProps {
  openModal: () => void;
}

export const Welcome = ({ openModal }: WelcomeProps) => {
  return (
    <div className="m-auto flex h-full w-full items-center justify-center text-center">
      <div className="max-w-4xl p-6">
        <h1 className="mx-2 mb-12 text-7xl font-bold sm:text-8xl">
          Welcome to our{" "}
          <span className="to-primary-hover bg-gradient-to-r from-primary bg-clip-text text-transparent">recipe </span>
          app!
        </h1>
        <p className="my-6 text-center text-xl font-normal text-gray-600 lg:text-2xl">
          We&apos;re excited to help you discover new and delicious recipes with just a swipe of your finger. Our app is
          designed to make meal planning and cooking easy and fun, with a wide variety of recipes from all over the
          world.
        </p>
        <FoodIcons />
        <button
          className="text-l hover:bg-primary-hover hover:border-primary-hover focus:bg-primary-hover focus:border-primary-hover active:bg-primary-hover active:border-primary-hover my-2 rounded border-primary bg-primary px-12 py-3 text-xl font-medium leading-tight text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:opacity-60"
          onClick={openModal}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
