import { FoodIcons } from "../FoodIcons";

interface IWelcomeProps {
  openModal: () => void;
}

export const Welcome: React.FC<IWelcomeProps> = ({ openModal }) => {
  return (
    <div className="w-full h-full m-auto flex items-center justify-center text-center">
      <div className="max-w-4xl p-6">
        <h1 className="text-7xl sm:text-8xl font-bold mx-2 mb-12">
          Welcome to our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">
            recipe{" "}
          </span>
          app!
        </h1>
        <h2 className="text-xl text-center font-normal lg:text-2xl text-gray-600 my-6">
          We&apos;re excited to help you discover new and delicious recipes with
          just a swipe of your finger. Our app is designed to make meal planning
          and cooking easy and fun, with a wide variety of recipes from all over
          the world.
        </h2>
        <FoodIcons />
        <button
          onClick={openModal}
          className="font-medium disabled:opacity-60 text-xl py-3 my-2 px-12 disabled:pointer-events-none text-l leading-tight rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out border-primary bg-primary text-white hover:bg-primary-hover hover:border-primary-hover focus:bg-primary-hover focus:border-primary-hover active:bg-primary-hover active:border-primary-hover"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
