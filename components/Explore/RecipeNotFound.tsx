import classNames from "classnames";

interface IRecipeErrorProps {
  title: string;
  text: string;
  isError?: boolean;
}

// TODO: Dodanie svg z ikoną błędu
export const RecipeNotFound: React.FC<IRecipeErrorProps> = ({
  title,
  text,
  isError,
}) => {
  return (
    <div className="flex flex-col gap-2 text-center font-medium text-gray-400">
      <p className="font-bold text-xl text-gray-500">{title}</p>
      <p>{text}</p>
    </div>
  );
};
