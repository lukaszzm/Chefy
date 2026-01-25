import { Routes } from "@/config/routes";
import { LikesList } from "@/features/likes/components/list";
import { LikesNotFound } from "@/features/likes/components/not-found";
import { LikesPagination } from "@/features/likes/components/pagination";
import { getAuthSession } from "@/lib/auth/utils";
import { getLikedRecipes } from "@/lib/db/queries/recipe";
import { redirectWithParams } from "@/utils/redirect-with-params";
import { safeNumber } from "@/utils/safe-number";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("likes.seo");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LikesListPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const fixedPage = safeNumber(page);

  const session = await getAuthSession();

  if (!session) {
    return redirect(Routes.SignIn);
  }

  const { recipes, pageCount } = await getLikedRecipes(session.user.id, fixedPage);

  if (pageCount === 0) {
    return <LikesNotFound />;
  }

  if (fixedPage > pageCount) {
    return redirectWithParams(Routes.Likes, {
      page: String(pageCount),
    });
  }

  return (
    <>
      <LikesList data={recipes} />
      <LikesPagination lastPage={pageCount} page={fixedPage} />
    </>
  );
}
