import { Alert } from "@/components/UI/Alert";
import { Subtitle } from "@/components/UI/Subtitle";
import { Button } from "@/components/UI/Button";
import { Tag } from "@/components/UI/Tag";
import { generatePDF } from "@/utils/generatePDF";
import { useDeleteLike } from "@/hooks/useDeleteLike";

interface RecipeDetailsProps {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
}

export const RecipeDetails = ({
  ingredients,
  instructions,
  id,
  title,
}: RecipeDetailsProps) => {
  const { apiResponse, isLoading, isSuccess, mutate } = useDeleteLike();

  return (
    <>
      <div className="overflow-auto h-96 px-2 mb-3">
        <div>
          <Subtitle id="ingredients-heading">Ingredients</Subtitle>
          <ul
            className="flex flex-wrap max-w-full"
            aria-labelledby="ingredients-heading"
          >
            {ingredients.map((el, index) => (
              <li key={index}>
                <Tag>{el}</Tag>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-left py-2 border-b-2">
          <Subtitle id="instructions-heading">Instructions</Subtitle>
          <div className="flex flex-wrap max-w-full">
            <p className="text-sm p-1" aria-labelledby="instructions-heading">
              {instructions}
            </p>
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        fullWidth
        onClick={() => generatePDF({ title, ingredients, instructions })}
      >
        Generate PDF
      </Button>
      {apiResponse && (
        <Alert variant={apiResponse.isError ? "error" : "success"}>
          {apiResponse.text}
        </Alert>
      )}
      <Button
        isLoading={isLoading}
        disabled={isSuccess}
        onClick={() => mutate(id)}
        variant="outline-danger"
        fullWidth
      >
        Delete from likes
      </Button>
    </>
  );
};
