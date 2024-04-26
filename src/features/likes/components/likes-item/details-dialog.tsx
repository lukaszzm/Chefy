import { BadgeInfo } from "lucide-react";

import { RecipeIngredients } from "@/components/recipe/recipe-ingredients";
import { RecipeSubtitle } from "@/components/recipe/recipe-subtitle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMenu } from "@/features/likes/hooks/use-menu";

export const LikesItemDetailsDialog = () => {
  const {
    recipe: { title, ingredients, instructions },
  } = useMenu();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button items="start" role="menuitem" variant="ghost">
          <BadgeInfo />
          <span>Show Recipe</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <RecipeSubtitle>Ingredients</RecipeSubtitle>
            <RecipeIngredients ingredients={ingredients} />
          </div>
          <div className="space-y-2">
            <RecipeSubtitle>Instructions</RecipeSubtitle>
            <p>{instructions}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
