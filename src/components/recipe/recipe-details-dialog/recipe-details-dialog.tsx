import { BadgeInfo } from "lucide-react";

import { RecipeIngredients } from "@/components/recipe/recipe-ingredients";
import { RecipeSubtitle } from "@/components/recipe/recipe-subtitle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Recipe } from "@/types";

interface RecipeDetailsDialogProps extends Pick<Recipe, "title" | "ingredients" | "instructions"> {}

export const RecipeDetailsDialog = ({ title, ingredients, instructions }: RecipeDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button items="start" variant="ghost">
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
