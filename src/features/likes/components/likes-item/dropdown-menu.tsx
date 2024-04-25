"use client";

import { useState } from "react";

import { Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LikesItemDeleteButton } from "@/features/likes/components/likes-item/delete-button";
import { LikesItemDetailsDialog } from "@/features/likes/components/likes-item/details-dialog";
import { PDFGenerateButton } from "@/features/pdf";
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
        <LikesItemDetailsDialog {...props} />
        <PDFGenerateButton {...props} />
        <LikesItemDeleteButton id={props.id} onDelete={() => setIsMenuOpen(false)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
