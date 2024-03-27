import { Buttons } from "@/components/Explore/Buttons";
import { Category } from "@/components/Explore/Category";
import { Ingredients } from "@/components/Explore/Ingredients";
import { Instruction } from "@/components/Explore/Instruction";
import { SwipeCard } from "@/components/Explore/SwipeCard";
import { ContentWrapper } from "@/components/OLD_UI/ContentWrapper";
import { Notification } from "@/components/OLD_UI/Notification";
import { ResponsiveImage } from "@/components/OLD_UI/ResponsiveImage";
import { Title } from "@/components/OLD_UI/Title";
import { useRecipe } from "@/hooks/useRecipe";
import type { Recipe as IRecipe } from "@/interfaces";

export const Recipe = ({ id, title, imageSrc, category, area, ingredients, instructions }: IRecipe) => {
  const { isShortVersion, setIsShortVersion, likeHandler, dislikeHandler, isLike, setIsLike, isError, setIsError } =
    useRecipe(id);

  return (
    <>
      <SwipeCard isLike={isLike} setIsLike={setIsLike} onSwipeLeft={dislikeHandler} onSwipeRight={likeHandler}>
        <ContentWrapper>
          <div className="overflow-auto">
            <ResponsiveImage alt={title} src={imageSrc} />
            <Title>{title}</Title>
            <div className="grid gap-2 px-2">
              <Category area={area.name} category={category.name} hideLabel={isShortVersion} />
              {!isShortVersion && (
                <>
                  <Ingredients ingredientsList={ingredients} />
                  <Instruction instruction={instructions} />
                </>
              )}
            </div>
            <button
              className="m-1 rounded-3xl bg-gray-100 p-3 text-sm font-medium text-gray-700 shadow-sm transition duration-150  ease-in-out hover:bg-gray-200 hover:shadow-sm focus:outline-none focus:ring-0 disabled:pointer-events-none"
              onClick={() => setIsShortVersion(!isShortVersion)}
            >
              {isShortVersion ? "Read More" : "Read less"}
            </button>
          </div>
          <Buttons dislikeHandler={dislikeHandler} likeHandler={likeHandler} />
        </ContentWrapper>
      </SwipeCard>
      <Notification closeNotification={() => setIsError(false)} isOpen={isError}>
        Recipe could not be added to likes/dislikes.
      </Notification>
    </>
  );
};
