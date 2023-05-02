import { useRecipe } from "@/hooks/useRecipe";
import type { Recipe as IRecipe } from "@/interfaces";
import { ResponsiveImage } from "@/components/UI/ResponsiveImage";
import { Title } from "@/components/UI/Title";
import { Buttons } from "../Buttons";
import { Category } from "../Category";
import { Ingredients } from "../Ingredients";
import { Instruction } from "../Instruction";
import { ContentWrapper } from "../../UI/ContentWrapper";
import { SwipeCard } from "../SwipeCard";
import { Notification } from "../../UI/Notification";

export const Recipe: React.FC<IRecipe> = ({
  id,
  title,
  imageSrc,
  category,
  area,
  ingredients,
  instructions,
}) => {
  const {
    isShortVersion,
    setIsShortVersion,
    likeHandler,
    dislikeHandler,
    isLike,
    setIsLike,
    isError,
  } = useRecipe(id);

  return (
    <>
      <SwipeCard
        onSwipeRight={likeHandler}
        onSwipeLeft={dislikeHandler}
        isLike={isLike}
        setIsLike={setIsLike}
      >
        <ContentWrapper>
          <div className="overflow-auto">
            <ResponsiveImage src={imageSrc} alt={title} />
            <Title>{title}</Title>
            <div className="grid gap-2 px-2">
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
            </div>
            <button
              onClick={() => setIsShortVersion(!isShortVersion)}
              className="font-medium text-sm p-3 m-1 text-gray-700 bg-gray-100 rounded-3xl shadow-sm hover:bg-gray-200 hover:shadow-sm  disabled:pointer-events-none focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              {isShortVersion ? "Read More" : "Read less"}
            </button>
          </div>
          <Buttons likeHandler={likeHandler} dislikeHandler={dislikeHandler} />
        </ContentWrapper>
      </SwipeCard>
      {isError && (
        <Notification>
          Recipe could not be added to likes/dislikes.
        </Notification>
      )}
    </>
  );
};
