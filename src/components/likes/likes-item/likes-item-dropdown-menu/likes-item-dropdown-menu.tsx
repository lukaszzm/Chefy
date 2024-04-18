"use client";

import { useState } from "react";

import { Ellipsis } from "lucide-react";

import { LikesItemDeleteButton } from "@/components/likes/likes-item/likes-item-delete-button";
import { PDFGenerateButton } from "@/components/pdf/pdf-generate-button";
import { RecipeDetailsDialog } from "@/components/recipe/recipe-details-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Recipe } from "@/types";

interface LikesItemDropdownMenuProps extends Recipe {}

export const LikesItemDropdownMenu = (props: LikesItemDropdownMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <RecipeDetailsDialog {...props} />
        <PDFGenerateButton {...props} />
        <LikesItemDeleteButton id={props.id} onDelete={() => setIsMenuOpen(false)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
