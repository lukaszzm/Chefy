import { LoadingSpinner } from "@/components/UI/LoadingSpinner";

export const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <LoadingSpinner color="white" size="md" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
