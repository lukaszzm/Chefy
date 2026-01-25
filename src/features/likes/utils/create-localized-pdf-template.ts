import { PDFTemplate } from "@/features/likes/components/pdf-template";
import type { Recipe, TranslateFun } from "@/types";

export function createLocalizedPdfTemplate(recipe: Recipe, t: TranslateFun) {
  return PDFTemplate({
    title: recipe.title,
    imageSrc: recipe.imageSrc,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    ingredientsLabel: t("likes.pdf.labels.ingredients"),
    instructionsLabel: t("likes.pdf.labels.instructions"),
    footer: t("likes.pdf.footer"),
  });
}
