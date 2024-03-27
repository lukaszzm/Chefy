import { Tag } from "@/components/OLD_UI/Tag";

interface IngredientsProps {
  ingredientsList: string[];
}

export const Ingredients = ({ ingredientsList }: IngredientsProps) => {
  return (
    <>
      <h2 className="text-left font-medium text-gray-900">Ingredients</h2>
      <ul className="flex max-w-full flex-wrap">
        {ingredientsList.map((el, index) => (
          <li key={index}>
            <Tag>{el}</Tag>
          </li>
        ))}
      </ul>
    </>
  );
};
