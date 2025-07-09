import { LikesListItem } from "@/features/likes/components/list/list-item";
import type { RecipeWithRelations } from "@/types";

interface LikesListProps {
  data: RecipeWithRelations[];
}

export function LikesList({ data }: LikesListProps) {
  return (
    <ul className="space-y-3">
      {data.map(({ recipe, ...rest }) => (
        <LikesListItem key={recipe.id} recipe={recipe} {...rest} />
      ))}
    </ul>
  );
}
