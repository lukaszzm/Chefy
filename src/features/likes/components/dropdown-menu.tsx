"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Routes } from "@/config/routes";
import { deleteLike } from "@/features/likes/actions/delete-like";
import { generatePdf } from "@/features/likes/utils/generate-pdf";
import { useAction } from "@/hooks/use-action";
import type { Recipe } from "@/types";
import { slugRoute } from "@/utils/slug-route";
import { useTranslations } from "next-intl";
import { createLocalizedPdfTemplate } from "@/features/likes/utils/create-localized-pdf-template";

interface LikesDropdownMenuProps {
  recipe: Recipe;
  withDetailsLink?: boolean;
  deleteWithRedirect?: boolean;
}

export function LikesDropdownMenu({ withDetailsLink, deleteWithRedirect, recipe }: LikesDropdownMenuProps) {
  const t = useTranslations();

  const { execute: handleDelete, isPending } = useAction({
    action: () => deleteLike(recipe.id, deleteWithRedirect ?? false),
    onError: (e) => toast.error(e),
  });

  const handleGeneratePdf = () => {
    const translatedTemplate = createLocalizedPdfTemplate(recipe, t);
    generatePdf(translatedTemplate, `${recipe.title}_Chefy.pdf`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t("likes.menu.trigger", { title: recipe.title })}
          data-pending={isPending ? "true" : undefined}
          size="icon"
          variant="ghost"
        >
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {withDetailsLink && (
          <DropdownMenuItem asChild>
            <Link href={slugRoute(Routes.Like, { id: recipe.id })}>{t("likes.menu.details")}</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleGeneratePdf}>{t("likes.menu.downloadPdf")}</DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          {t("likes.menu.delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
