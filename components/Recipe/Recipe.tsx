import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Ingredients } from "./Ingredients";
import { getIngredientsList } from "../../utils/getIngredientsList";
import { Instruction } from "./Instruction";
import { Recipe as IRecipe } from "../../interfaces/Recipe.interface";
import { Buttons } from "./Buttons";
import { Category } from "./Category";
import { ImageContainer } from "./ImageContainer";

export const Recipe = () => {
  const [recipe, setRecipe] = useState<IRecipe>();
  const [isShortVersion, setIsShortVersion] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = response.data;
      const ingredientsList = getIngredientsList(data.meals[0]);
      setRecipe({ ...data.meals[0], ingredientsList });
    } catch (err: unknown) {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const likeHandler = () => {
    console.log("LIKE");
    getRecipe();
  };

  const cancelHandler = () => {
    console.log("DONT LIKE");
    getRecipe();
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!recipe) return <p>{error}</p>;

  return (
    <div className="flex flex-col max-w-sm overflow-hidden">
      <ImageContainer src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h2 className="font-semibold text-2xl m-2">{recipe.strMeal}</h2>
      <div className="overflow-auto max-h-96 mb-2">
        <Category category={recipe.strCategory} area={recipe.strArea} />
        {recipe.ingredientsList && (
          <Ingredients
            shortVersion={isShortVersion}
            ingredientsList={recipe!.ingredientsList}
          />
        )}
        <Instruction
          shortVersion={isShortVersion}
          instruction={recipe.strInstructions}
        />
        <button
          onClick={() => setIsShortVersion(!isShortVersion)}
          className="p-2 font-semibold text-md text-gray-700 bg-gray-100 my-3 mx-6 px-10 rounded-3xl shadow-sm hover:bg-gray-200 hover:shadow-sm transition duration-150  ease-in-out"
        >
          {isShortVersion ? "Read More" : "Read less"}
        </button>
      </div>
      <Buttons onLikeClick={likeHandler} onCancelClick={cancelHandler} />
    </div>
  );
};