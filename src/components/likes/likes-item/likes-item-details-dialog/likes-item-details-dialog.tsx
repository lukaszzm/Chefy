"use client";

import { BadgeInfo } from "lucide-react";

import { RecipeIngredients } from "@/components/recipe/recipe-ingredients";
import { RecipeSubtitle } from "@/components/recipe/recipe-subtitle";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { Recipe } from "@/types";

interface LikesItemDetailsDialogProps extends Recipe {}

export const LikesItemDetailsDialog = ({ title, instructions, ingredients }: LikesItemDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <BadgeInfo />
          <span>Show Instructions</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="w-full space-y-2">
          <RecipeSubtitle>Ingredients</RecipeSubtitle>
          <RecipeIngredients ingredients={ingredients} />
          <RecipeSubtitle>Instructions</RecipeSubtitle>
          <p>{instructions}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
