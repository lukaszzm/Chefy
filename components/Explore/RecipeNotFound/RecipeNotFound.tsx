import Image from "next/image";
import noDataSvg from "@/public/noData.svg";
import errorSvg from "@/public/error.svg";

interface RecipeErrorProps {
  title: string;
  text: string;
  isError?: boolean;
}

export const RecipeNotFound = ({ title, text, isError }: RecipeErrorProps) => {
  return (
    <div className="flex flex-col w-full h-[calc(100svh-4rem)] justify-center items-center font-medium text-gray-400 text-center">
      <div className="flex gap-6 flex-col">
        {isError ? (
          <Image
            src={errorSvg}
            alt="Error occured"
            className="m-auto w-64 h-auto"
            priority
          />
        ) : (
          <Image
            src={noDataSvg}
            alt="Recipe not found"
            className="m-auto w-64 h-auto"
            priority
          />
        )}

        <div>
          <p className="font-bold text-xl text-gray-500">{title}</p>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};
