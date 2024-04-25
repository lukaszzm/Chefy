import { LikesItem } from "@/features/likes/components/likes-item";
import type { RecipeWithRelations } from "@/types";

interface LikesListProps {
  data: Array<RecipeWithRelations>;
}

export const LikesList = ({ data }: LikesListProps) => {
  return (
    <ul className="space-y-3">
      {data.map(({ recipe, category, area }) => (
        <LikesItem area={area.name} category={category.name} key={recipe.id} {...recipe} />
      ))}
    </ul>
  );
};
