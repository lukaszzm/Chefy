import { useState } from "react";
import type { ApiResponse } from "@/interfaces";
import { Alert } from "@/ui/Alert";
import { Subtitle } from "@/ui/Subtitle";
import { Button } from "@/ui/Button";
import { Tag } from "@/ui/Tag";
import { generatePDF } from "@/utils/generatePDF";
import { useRouter } from "next/router";

interface IRecipeDetailsProps {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
}

export const RecipeDetails: React.FC<IRecipeDetailsProps> = ({
  ingredients,
  instructions,
  id,
  title,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>();
  const router = useRouter();
  const { asPath } = router;

  const deleteHandler = async (id: string) => {
    setApiResponse(null);
    setIsSubmitting(true);
    const response = await fetch(`/api/recipes/likes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setApiResponse({ isError: true, text: "Something went wrong." });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    router.replace(asPath);
  };

  return (
    <>
      <div className="overflow-auto h-96 px-2 mb-3">
        <div>
          <Subtitle>Ingredients</Subtitle>
          <div className="flex flex-wrap max-w-full">
            {ingredients.map((el, index) => (
              <Tag key={index}>{el}</Tag>
            ))}
          </div>
        </div>
        <div className="text-left py-2 border-b-2">
          <Subtitle>Instructions</Subtitle>
          <div className="flex flex-wrap max-w-full">
            <p className="text-sm p-1">{instructions}</p>
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
        <Alert isError={apiResponse.isError}>{apiResponse.text}</Alert>
      )}
      <Button
        isLoading={isSubmitting}
        onClick={() => deleteHandler(id)}
        variant="outline-danger"
        fullWidth
      >
        Delete from likes
      </Button>
    </>
  );
};
