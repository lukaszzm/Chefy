import { Tag } from "@/components/UI/Tag";

interface IIngredientsProps {
  ingredientsList: string[];
}

export const Ingredients: React.FC<IIngredientsProps> = ({
  ingredientsList,
}) => {
  return (
    <>
      <h2 className="text-left font-medium text-gray-900">Ingredients</h2>
      <ul className="flex flex-wrap max-w-full">
        {ingredientsList.map((el, index) => (
          <li key={index}>
            <Tag>{el}</Tag>
          </li>
        ))}
      </ul>
    </>
  );
};
