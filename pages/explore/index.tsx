import { GetServerSideProps, NextPage } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { RecipeLoading } from "@/components/Explore/RecipeLoading";
import { RecipeNotFound } from "@/components/Explore/RecipeNotFound";
import { Recipe } from "@/components/Explore/Recipe";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { fetchRecipes } from "@/queries/fetchRecipes";
import { useQuery } from "@tanstack/react-query";
import { Recipe as IRecipe } from "@/interfaces";

const ExplorePage: NextPage = () => {
  const { data, isLoading, isError, isFetching } = useQuery<IRecipe[]>({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
    staleTime: 0,
    keepPreviousData: true,
    select: (data) => [...data].reverse(),
  });

  if (isLoading) return <RecipeLoading />;

  if (isError)
    return (
      <RecipeNotFound
        title="Something went wrong."
        text="Try again later."
        isError={true}
      />
    );

  return (
    <AnimatePresence>
      {data.length > 0 ? (
        data.map((recipe) => (
          <Recipe
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            imageSrc={recipe.imageSrc}
            category={recipe.category}
            area={recipe.area}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
          />
        ))
      ) : isFetching ? (
        <RecipeLoading />
      ) : (
        <RecipeNotFound
          title="No recipes found."
          text="Change preferences to discover new recipes."
        />
      )}
    </AnimatePresence>
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
