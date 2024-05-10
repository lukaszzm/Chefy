"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { routes } from "@/config/routes";
import { deleteLike } from "@/features/likes/actions/delete-like";
import { PDFTemplate } from "@/features/likes/components/pdf-template";
import { generatePdf } from "@/features/likes/utils/generate-pdf";
import { useAction } from "@/hooks/use-action";
import type { Recipe } from "@/types";
import { slugRoute } from "@/utils/slug-route";

interface LikesDropdownMenuProps {
  withDetailsLink?: boolean;
  deleteWithRedirect?: boolean;
  recipe: Recipe;
}

export const LikesDropdownMenu = ({ withDetailsLink, deleteWithRedirect, recipe }: LikesDropdownMenuProps) => {
  const { execute: deleteItem, isPending } = useAction({
    action: () => deleteLike(recipe.id, deleteWithRedirect ?? false),
    onError: (e) => toast.error(e),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={`Open menu for ${recipe.title}`}
          data-pending={isPending ? "true" : undefined}
          size="icon"
          variant="ghost"
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {withDetailsLink && (
          <DropdownMenuItem asChild>
            <Link href={slugRoute(routes.like, { id: recipe.id })}>Details</Link>
          </DropdownMenuItem>
        )}

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
