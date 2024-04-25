import { LikesItem } from "@/features/likes/components/likes-item";
import type { SuggestedRecipe } from "@/types";

interface LikesListProps {
  recipes: SuggestedRecipe[];
}

export const LikesList = ({ recipes }: LikesListProps) => {
  return (
    <ul className="space-y-3">
      {recipes.map(({ recipe, category, area }) => (
        <LikesItem area={area.name} category={category.name} key={recipe.id} {...recipe} />
      ))}
    </ul>
  );
};
