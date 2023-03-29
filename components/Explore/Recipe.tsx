import { useRecipe } from "@/hooks/useRecipe";
import type { Recipe as IRecipe } from "@/interfaces";
import { Alert } from "@/ui/Alert";
import { ResponsiveImage } from "@/ui/ResponsiveImage";
import { Title } from "@/ui/Title";
import { Buttons } from "./Buttons";
import { Category } from "./Category";
import { Ingredients } from "./Ingredients";
import { Instruction } from "./Instruction";
import { ContentWrapper } from "../UI/ContentWrapper";
import { SwipeCard } from "./SwipeCard";

interface IRecipeProps extends IRecipe {
  refetchRecipe: () => void;
}

export const Recipe: React.FC<IRecipeProps> = ({
  id,
  title,
  imageSrc,
  category,
  area,
  ingredients,
  instructions,
  refetchRecipe,
}) => {
  const {
    isShortVersion,
    setIsShortVersion,
    isSubmitting,
    apiResponse,
    likeHandler,
    dislikeHandler,
  } = useRecipe(id, refetchRecipe);

  return (
    <SwipeCard>
      <ContentWrapper>
        <div className="overflow-auto">
          <ResponsiveImage src={imageSrc} alt={title} />
          <Title>{title}</Title>
          <Category
            category={category.name}
            area={area.name}
            hideLabel={isShortVersion}
          />
          {!isShortVersion && (
            <>
              <Ingredients ingredientsList={ingredients} />
              <Instruction instruction={instructions} />
            </>
          )}
          <button
            onClick={() => setIsShortVersion(!isShortVersion)}
            className="font-medium text-sm p-3 m-1 text-gray-700 bg-gray-100 rounded-3xl shadow-sm hover:bg-gray-200 hover:shadow-sm  disabled:pointer-events-none focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            {isShortVersion ? "Read More" : "Read less"}
          </button>
        </div>
        {apiResponse && <Alert isError={true}>{apiResponse.text}</Alert>}
        <Buttons
          disabled={isSubmitting}
          likeHandler={likeHandler}
          dislikeHandler={dislikeHandler}
        />
      </ContentWrapper>
    </SwipeCard>
  );
};
