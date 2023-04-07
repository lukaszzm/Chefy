import Image from "next/image";
import noDataSvg from "@/public/noData.svg";
import errorSvg from "@/public/error.svg";

interface IRecipeErrorProps {
  title: string;
  text: string;
  isError?: boolean;
}

export const RecipeNotFound: React.FC<IRecipeErrorProps> = ({
  title,
  text,
  isError,
}) => {
  return (
    <div className="flex flex-col w-full h-[calc(100svh-4rem)] justify-center items-center font-medium text-gray-400 text-center">
      <div className="flex gap-6 flex-col">
        {isError ? (
          <Image
            src={errorSvg}
            alt={"Error occured"}
            width={300}
            height={300}
            className="m-auto"
          />
        ) : (
          <Image
            src={noDataSvg}
            alt={"Recipe not found"}
            width={200}
            height={200}
            className="m-auto"
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
