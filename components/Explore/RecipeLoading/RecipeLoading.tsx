import { LoadingSpinner } from "@/components/UI/LoadingSpinner";

export const RecipeLoading: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-[calc(100svh-4rem)] justify-center items-center">
      <div>
        <LoadingSpinner size="md" color="gray" />
        <p className="font-medium text-gray-400 pt-2">
          Searching recipes for you..
        </p>
      </div>
    </div>
  );
};
