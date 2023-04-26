import type { Category } from "@/interfaces";
import { useSettingsForm } from "@/hooks/useSettingsForm/useSettingsForm";
import { isItemChosen } from "@/utils/isItemChosen";
import { Checkbox } from "@/components/ui/Checkbox/Checkbox";
import { Alert } from "@/components/ui/Alert/Alert";
import { Button } from "@/components/ui/Button/Button";
import { Label } from "@/components/ui/Label/Label";

interface ICategoriesProps {
  allCategories: Category[];
  checkedByDefaultCategories: Category[];
}

export const Categories: React.FC<ICategoriesProps> = ({
  allCategories,
  checkedByDefaultCategories,
}) => {
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
      className="text-left m-2 pb-2 border-b border-b-gray-200"
    >
      <Label htmlFor="Category">Categories</Label>
      <ul role="list" className="flex flex-wrap">
        {allCategories.map((el) => (
          <Checkbox
            {...register("prefferedCategories")}
            key={el.id}
            id={el.id}
            text={el.name}
            isCheckedByDefault={isItemChosen(el, checkedByDefaultCategories)}
          />
        ))}
      </ul>
      {apiResponse && isDirty && (
        <Alert isError={apiResponse.isError}>{apiResponse.text}</Alert>
      )}
      <Button variant="primary" disabled={!isDirty} isLoading={isLoading}>
        Save
      </Button>
    </form>
  );
};
