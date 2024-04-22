import { getLikedRecipes } from "@/actions/recipe/get-liked-recipes";
import { LikesList } from "@/components/likes/likes-list";
import { LikesPagination } from "@/components/likes/likes-pagination";
import { routes } from "@/config/routes";
import { redirectWithParams } from "@/utils/redirect-with-params";
import { safeNumber } from "@/utils/safe-number";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function LikesPage({ searchParams: { page } }: PageProps) {
  const fixedPage = safeNumber(page);

  const { recipes, pageCount } = await getLikedRecipes(fixedPage);

  if (fixedPage > pageCount) {
    return redirectWithParams(routes.likes, {
      page: String(pageCount),
    });
  }

  return (
    <>
      <LikesList recipes={recipes} />
      <LikesPagination lastPage={pageCount} page={fixedPage} />
    </>
  );
}
