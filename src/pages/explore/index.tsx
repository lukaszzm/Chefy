import React from "react";

import type { GetServerSideProps } from "next";

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { getServerSession } from "next-auth";

import { Recipe } from "@/components/Explore/Recipe";
import { RecipeLoading } from "@/components/Explore/RecipeLoading";
import { RecipeNotFound } from "@/components/Explore/RecipeNotFound";
import type { Recipe as IRecipe } from "@/interfaces";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { fetchRecipes } from "@/queries/api/fetchRecipes";

const ExplorePage = () => {
  const { data, isLoading, isError, isFetching } = useQuery<IRecipe[]>({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
    staleTime: 0,
    select: (data) => [...data].reverse(),
  });

  if (isLoading) return <RecipeLoading />;

  if (isError) return <RecipeNotFound isError={true} text="Try again later." title="Something went wrong." />;

  return (
    <AnimatePresence>
      {data && data.length > 0 ? (
        data.map((recipe) => (
          <Recipe
            area={recipe.area}
            category={recipe.category}
            id={recipe.id}
            imageSrc={recipe.imageSrc}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            key={recipe.id}
            title={recipe.title}
          />
        ))
      ) : isFetching ? (
        <RecipeLoading />
      ) : (
        <RecipeNotFound text="Change preferences to discover new recipes." title="No recipes found." />
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
