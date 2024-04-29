import { Badge } from "@/components/new_ui/badge";

interface RecipeIngredientsProps {
  ingredients: string[];
}

export const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
    <ul className="flex max-w-full flex-wrap gap-2">
      {ingredients.map((el, index) => (
        <li key={index}>
          <Badge variant="outline">{el}</Badge>
        </li>
      ))}
    </ul>
  );
};
