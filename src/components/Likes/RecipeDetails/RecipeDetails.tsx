import { Alert } from "@/components/UI/Alert/Alert";
import { Button } from "@/components/UI/Button/Button";
import { Subtitle } from "@/components/UI/Subtitle";
import { Tag } from "@/components/UI/Tag";
import { useDeleteLike } from "@/hooks/useDeleteLike";
import { generatePDF } from "@/utils/generatePDF";

interface RecipeDetailsProps {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
}

export const RecipeDetails = ({ ingredients, instructions, id, title }: RecipeDetailsProps) => {
  const { apiResponse, isPending, isSuccess, mutate } = useDeleteLike();

  return (
    <>
      <div className="mb-3 h-96 overflow-auto px-2">
        <div>
          <Subtitle id="ingredients-heading">Ingredients</Subtitle>
          <ul aria-labelledby="ingredients-heading" className="flex max-w-full flex-wrap">
            {ingredients.map((el, index) => (
              <li key={index}>
                <Tag>{el}</Tag>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-b-2 py-2 text-left">
          <Subtitle id="instructions-heading">Instructions</Subtitle>
          <div className="flex max-w-full flex-wrap">
            <p aria-labelledby="instructions-heading" className="p-1 text-sm">
              {instructions}
            </p>
          </div>
        </div>
      </div>
      <Button variant="primary" fullWidth onClick={() => generatePDF({ title, ingredients, instructions })}>
        Generate PDF
      </Button>
      {apiResponse && <Alert variant={apiResponse.isError ? "error" : "success"}>{apiResponse.text}</Alert>}
      <Button disabled={isSuccess} isLoading={isPending} variant="outline-danger" fullWidth onClick={() => mutate(id)}>
        Delete from likes
      </Button>
    </>
  );
};
