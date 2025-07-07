import { routes } from "@/config/routes";
import { LikesList } from "@/features/likes/components/list";
import { LikesNotFound } from "@/features/likes/components/not-found";
import { LikesPagination } from "@/features/likes/components/pagination";
import { getAuthSession } from "@/lib/auth/utils";
import { getLikedRecipes } from "@/lib/db/queries/recipe";
import { redirectWithParams } from "@/utils/redirect-with-params";
import { safeNumber } from "@/utils/safe-number";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Liked recipes | Chefy",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function LikesListPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const { page } = searchParams;

  const fixedPage = safeNumber(page);

  const session = await getAuthSession();

  if (!session) {
    return redirect(routes.signIn);
  }

  const { recipes, pageCount } = await getLikedRecipes(session.user.id, fixedPage);

  if (pageCount === 0) {
    return <LikesNotFound />;
  }

  if (fixedPage > pageCount) {
    return redirectWithParams(routes.likes, {
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
