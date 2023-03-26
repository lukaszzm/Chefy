import classNames from "classnames";
import { Buttons } from "./Buttons";
import { Subtitle } from "@/ui/Subtitle";

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
  const styles = classNames(
    "flex justify-center items-center w-full h-full sm:min-h-[32rem] rounded-md font-medium text-gray-800 mb-6",
    {
      "bg-red-100": isError,
      "bg-gray-200": !isError,
    }
  );

  return (
    <>
      <div className={styles}>
        <div>
          <Subtitle>{title} </Subtitle>
          <p className="text-center">{text}</p>
        </div>
      </div>
      <Buttons disabled />
    </>
  );
};
