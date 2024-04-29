"use client";

import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "@/config/routes";
import { deleteLike } from "@/features/likes/actions/delete-like";
import { PDFTemplate } from "@/features/likes/components/pdf-template";
import { generatePdf } from "@/features/likes/utils/generate-pdf";
import { useAction } from "@/hooks/use-action";
import type { Recipe } from "@/types";
import { slugRoute } from "@/utils/slug-route";

interface LikesItemDropdownMenuProps extends Recipe {}

export const LikesItemDropdownMenu = (recipe: LikesItemDropdownMenuProps) => {
  const { execute: deleteItem, isPending } = useAction({
    action: () => deleteLike(recipe.id),
    onError: (e) => toast.error(e),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Open Menu" data-pending={isPending ? "true" : undefined} size="icon" variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <DropdownMenuItem asChild>
          <Link href={slugRoute(routes.like, { id: recipe.id })}>Details</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => generatePdf(<PDFTemplate {...recipe} />, `${recipe.title}_Chefy.pdf`)}>
          Download PDF
        </DropdownMenuItem>

        <DropdownMenuItem variant="destructive" onClick={deleteItem}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
