import { LoadingSpinner } from "./LoadingSpinner";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <LoadingSpinner size="md" color="white" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
