import { Tag } from "@/ui/Tag";

interface IIngredientsProps {
  ingredientsList: string[];
}

export const Ingredients: React.FC<IIngredientsProps> = ({
  ingredientsList,
}) => {
  return (
    <>
      <p className="text-left font-medium text-gray-900">Ingredients</p>
      <div className="flex flex-wrap max-w-full">
        {ingredientsList.map((el, index) => (
          <Tag key={index}>{el}</Tag>
        ))}
      </div>
    </>
  );
};
