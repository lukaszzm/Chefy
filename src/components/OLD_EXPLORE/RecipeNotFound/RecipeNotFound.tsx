import Image from "next/image";

import errorSvg from "@/public/error.svg";
import noDataSvg from "@/public/noData.svg";

interface RecipeErrorProps {
  title: string;
  text: string;
  isError?: boolean;
}

export const RecipeNotFound = ({ title, text, isError }: RecipeErrorProps) => {
  return (
    <div className="flex h-[calc(100svh-4rem)] w-full flex-col items-center justify-center text-center font-medium text-gray-400">
      <div className="flex flex-col gap-6">
        {isError ? (
          <Image alt="Error occured" className="m-auto h-auto w-64" src={errorSvg} priority />
        ) : (
          <Image alt="Recipe not found" className="m-auto h-auto w-64" src={noDataSvg} priority />
        )}

        <div>
          <p className="text-xl font-bold text-gray-500">{title}</p>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};
