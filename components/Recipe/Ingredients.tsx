import { Tag } from "../UI/Tag";

interface IIngredientsProps {
  ingredientsList: string[];
  shortVersion?: boolean;
}

export const Ingredients: React.FC<IIngredientsProps> = (props) => {
  const { ingredientsList, shortVersion } = props;

  const fixedIngredientsList = shortVersion
    ? ingredientsList.slice(0, 2)
    : ingredientsList;

  if (shortVersion) fixedIngredientsList.push("And more..");

  return (
    <>
      <h3 className="text-left font-semibold text-gray-900">Ingredients</h3>
      <div className="flex flex-row flex-wrap max-w-full">
        {fixedIngredientsList.map((el, index) => (
          <Tag key={index}>{el}</Tag>
        ))}
      </div>
    </>
  );
};
