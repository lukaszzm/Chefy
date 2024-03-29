import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import type { Recipe } from "@/interfaces";
import { Pagination } from "@/components/Likes/Pagination";
import { LikedRecipe } from "@/components/Likes/LikedRecipe";
import { Title } from "@/components/UI/Title";
import { ContentWrapper } from "@/components/UI/ContentWrapper";
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
          {recipes.map(
            ({ id, title, area, category, ingredients, instructions }) => (
              <LikedRecipe
                key={id}
                id={id}
                title={title}
                area={area.name}
                category={category.name}
                ingredients={ingredients}
                instructions={instructions}
              />
            )
          )}
          <Pagination currentPage={currentPage} pageCount={pageCount} />
        </>
      ) : (
        <p className="font-medium text-gray-500 my-auto">
          You don&apos;t have any recipes yet.
        </p>
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
    page = Array.isArray(context.query.page)
      ? parseInt(context.query.page[0]) || 1
      : parseInt(context.query.page) || 1;

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
