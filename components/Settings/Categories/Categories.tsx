import type { Category } from "@/interfaces";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import { isItemChosen } from "@/utils/isItemChosen";
import { Checkbox } from "@/components/UI/Checkbox";
import { Alert } from "@/components/UI/Alert";
import { Button } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";

interface CategoriesProps {
  allCategories: Category[];
  checkedByDefaultCategories: Category[];
}

export const Categories = ({
  allCategories,
  checkedByDefaultCategories,
}: CategoriesProps) => {
  const {
    register,
    formState: { isDirty },
    isLoading,
    apiResponse,
    submitFn,
  } = useSettingsForm({
    refetchRecipes: true,
  });

  return (
    <form
      onSubmit={submitFn}
      className="grid gap-1 text-left m-2 pb-2 border-b border-b-gray-200"
    >
      <Label htmlFor="Category">Categories</Label>
      <ul className="flex flex-wrap">
        {allCategories.map((el) => (
          <Checkbox
            {...register("preferredCategories")}
            key={el.id}
            id={el.id}
            text={el.name}
            isCheckedByDefault={isItemChosen(el, checkedByDefaultCategories)}
          />
        ))}
      </ul>
      {apiResponse && isDirty && (
        <Alert variant={apiResponse.isError ? "error" : "success"}>
          {apiResponse.text}
        </Alert>
      )}
      <Button variant="primary" disabled={!isDirty} isLoading={isLoading}>
        Save
      </Button>
    </form>
  );
};
