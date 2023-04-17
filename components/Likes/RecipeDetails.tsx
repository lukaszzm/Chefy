import { useState } from "react";
import type { ApiResponse } from "@/interfaces";
import { Alert } from "@/components/ui/Alert";
import { Subtitle } from "@/components/ui/Subtitle";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { generatePDF } from "@/utils/generatePDF";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "@/queries/deleteLike";

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
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>();
  const router = useRouter();
  const { asPath } = router;
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (id: string) => deleteLike(id),
    onSuccess: () => {
      setApiResponse({
        isError: false,
        text: "Recipe deleted. Redirecting...",
      });
      router.replace(asPath);
    },
    onError: () => {
      setApiResponse({ isError: true, text: "Something went wrong." });
    },
  });

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
