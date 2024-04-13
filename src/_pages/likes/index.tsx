import type { GetServerSideProps } from "next";

import { getServerSession } from "next-auth";

import { authOptions } from "@/_pages/api/auth/[...nextauth]";
import { LikedRecipe } from "@/components/OLD_LIKES/LikedRecipe";
import { Pagination } from "@/components/OLD_LIKES/Pagination";
import { ContentWrapper } from "@/components/OLD_UI/ContentWrapper";
import { Title } from "@/components/OLD_UI/Title";
import type { Recipe } from "@/interfaces";
import { getLikedRecipes } from "@/queries/db/recipe";

interface LikesPageProps {
  recipes: Recipe[];
  currentPage: number;
  pageCount: number;
}

const LikesPage = ({ recipes, currentPage, pageCount }: LikesPageProps) => {
  return (
    <ContentWrapper>
      <Title>Your liked recipes</Title>
      {recipes.length > 0 ? (
        <>
          {recipes.map(({ id, title, area, category, ingredients, instructions }) => (
            <LikedRecipe
              area={area.name}
              category={category.name}
              id={id}
              ingredients={ingredients}
              instructions={instructions}
              key={id}
              title={title}
            />
          ))}
          <Pagination currentPage={currentPage} pageCount={pageCount} />
        </>
      ) : (
        <p className="my-auto font-medium text-gray-500">You don&apos;t have any recipes yet.</p>
      )}
    </ContentWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permament: false,
      },
    };
  }

  const userEmail = session.user.email;
  let page = 1;

  if (context.query.page)
    page = Array.isArray(context.query.page) ? parseInt(context.query.page[0]) || 1 : parseInt(context.query.page) || 1;

  const recipes = await getLikedRecipes(userEmail, page);
  const pageCount = Math.ceil(recipes[0] / 5);

  if (pageCount > 0 && page > pageCount)
    return {
      props: {},
      redirect: {
        destination: `/likes?page=${pageCount}`,
        permament: true,
      },
    };

  return {
    props: {
      pageCount: pageCount,
      recipes: recipes[1],
      currentPage: page,
    },
  };
};

export default LikesPage;
