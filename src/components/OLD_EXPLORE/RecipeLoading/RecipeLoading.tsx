import { LoadingSpinner } from "@/components/OLD_UI/LoadingSpinner";

export const RecipeLoading = () => {
  return (
    <div className="flex h-[calc(100svh-4rem)] w-full flex-col items-center justify-center">
      <div>
        <LoadingSpinner color="gray" size="md" />
        <p className="pt-2 font-medium text-gray-400">Searching recipes for you..</p>
      </div>
    </div>
  );
};
