import { Alert } from "@/components/OLD_UI/Alert/Alert";
import { Button } from "@/components/OLD_UI/Button/Button";
import { Checkbox } from "@/components/OLD_UI/Checkbox/Checkbox";
import { Label } from "@/components/OLD_UI/Label/Label";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import type { Category } from "@/interfaces";
import { isItemChosen } from "@/utils/isItemChosen";

interface CategoriesProps {
  allCategories: Category[];
  checkedByDefaultCategories: Category[];
}

export const Categories = ({ allCategories, checkedByDefaultCategories }: CategoriesProps) => {
  const {
    register,
    formState: { isDirty },
    isPending,
    apiResponse,
    submitFn,
  } = useSettingsForm({
    refetchRecipes: true,
  });

  return (
    <form className="m-2 grid gap-1 border-b border-b-gray-200 pb-2 text-left" onSubmit={submitFn}>
      <Label htmlFor="Category">Categories</Label>
      <ul className="flex flex-wrap">
        {allCategories.map((el) => (
          <Checkbox
            {...register("preferredCategories")}
            id={el.id}
            isCheckedByDefault={isItemChosen(el, checkedByDefaultCategories)}
            key={el.id}
            text={el.name}
          />
        ))}
      </ul>
      {apiResponse && isDirty && <Alert variant={apiResponse.isError ? "error" : "success"}>{apiResponse.text}</Alert>}
      <Button disabled={!isDirty} isLoading={isPending} variant="primary">
        Save
      </Button>
    </form>
  );
};
