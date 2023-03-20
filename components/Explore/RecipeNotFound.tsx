import { Buttons } from "./Buttons";
import { Subtitle } from "@/ui/Subtitle";

export const RecipeNotFound = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-full sm:min-h-[32rem] bg-gray-100 rounded-md mb-6">
        <div>
          <Subtitle className="text-center">No more recipes found.</Subtitle>
          <p className="p-2 text-gray-700 text-base m-0">
            Change preferences to discover more recipes!
          </p>
        </div>
      </div>
      <Buttons disabled />
    </>
  );
};
