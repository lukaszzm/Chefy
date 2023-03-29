import { LoadingSpinner } from "../UI/LoadingSpinner";

export const RecipeLoading: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <LoadingSpinner size="md" color="gray" />
      <p className="font-medium text-gray-400">Searching recipes for you.. </p>
    </div>
  );
};
