import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { Title } from "@/components/ui/title";
import { getLikeRecipeById } from "@/lib/db/queries/recipe";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const data = await getLikeRecipeById(id);

  return {
    title: data?.recipe.title ?? "Recipe not found",
  };
}
export default async function LikePage({ params: { id } }: PageProps) {
  const data = await getLikeRecipeById(id);

  if (!data) {
    return notFound();
  }

  return <Title>{data.recipe.title}</Title>;
}
