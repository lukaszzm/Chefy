import { LikesItem } from "@/features/likes/components/likes-item";
import type { RecipeWithRelations } from "@/types";

interface LikesListProps {
  data: Array<RecipeWithRelations>;
}

export const LikesList = ({ data }: LikesListProps) => {
  return (
    <ul className="space-y-3">
      {data.map(({ recipe, ...rest }) => (
        <LikesItem key={recipe.id} recipe={recipe} {...rest} />
      ))}
    </ul>
  );
};
