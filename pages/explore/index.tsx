import { GetServerSideProps, NextPage } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { RecipeLoading } from "@/components/Explore/RecipeLoading";
import { RecipeNotFound } from "@/components/Explore/RecipeNotFound";
import { Recipe } from "@/components/Explore/Recipe";
import { useRandomRecipe } from "@/hooks/useRandomRecipe";

const ExplorePage: NextPage = () => {
  const { data, error, isValidating, refetchData } = useRandomRecipe();

  if (isValidating) return <RecipeLoading />;

  if (error)
    return (
      <RecipeNotFound
        title="Something went wrong."
        text="Try again later."
        isError={true}
      />
    );

  if (data)
    return (
      <Recipe
        id={data.id}
        title={data.title}
        imageSrc={data.imageSrc}
        category={data.category}
        area={data.area}
        ingredients={data.ingredients}
        instructions={data.instructions}
        refetchRecipe={() => refetchData()}
      />
    );

  return (
    <RecipeNotFound
      title="No more recipes found."
      text="Change preferences to discover more recipes!"
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permament: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default ExplorePage;
