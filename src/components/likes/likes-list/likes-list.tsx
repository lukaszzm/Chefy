import { getLikedRecipes } from "@/actions/recipe/get-liked-recipes";
import { LikesItem } from "@/components/likes/likes-item";

export const LikesList = async () => {
  const likes = await getLikedRecipes();

  return (
    <ul className="space-y-3">
      {likes.map(({ recipe, category, area }) => (
        <LikesItem area={area.name} category={category.name} key={recipe.id} {...recipe} />
      ))}
    </ul>
  );
};
