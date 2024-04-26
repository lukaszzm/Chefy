"use client";

import { Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LikesItemDeleteButton } from "@/features/likes/components/likes-item/delete-button";
import { LikesItemDetailsDialog } from "@/features/likes/components/likes-item/details-dialog";
import { PDFGenerateButton } from "@/features/likes/components/pdf/generate-button";
import { useMenu } from "@/features/likes/hooks/use-menu";

export const LikesItemDropdownMenu = () => {
  const { isOpen, changeMenuState } = useMenu();

  return (
    <DropdownMenu open={isOpen} onOpenChange={changeMenuState}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <LikesItemDetailsDialog />
        <PDFGenerateButton />
        <LikesItemDeleteButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
