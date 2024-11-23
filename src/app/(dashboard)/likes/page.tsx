import { Title } from "@/components/ui/title";
import { routes } from "@/config/routes";
import { LikesList } from "@/features/likes/components/list";
import { LikesNotFound } from "@/features/likes/components/not-found";
import { LikesPagination } from "@/features/likes/components/pagination";
import { authUser } from "@/lib/auth";
import { getLikedRecipes } from "@/lib/db/queries/recipe";
import { redirectWithParams } from "@/utils/redirect-with-params";
import { safeNumber } from "@/utils/safe-number";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function LikesPage({ searchParams: { page } }: PageProps) {
  const fixedPage = safeNumber(page);
  const { id } = await authUser();

  const { recipes, pageCount } = await getLikedRecipes(id, fixedPage);

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
      <Title>Liked Recipes</Title>
      <LikesList data={recipes} />
      <LikesPagination lastPage={pageCount} page={fixedPage} />
    </>
  );
}
