import type { Category } from "@/interfaces";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import { isItemChosen } from "@/utils/isItemChosen";
import { Checkbox } from "@/ui/Checkbox";
import { Alert } from "@/ui/Alert";
import { Button } from "@/ui/Button";
import { Label } from "@/ui/Label";

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
    handleSubmit,
    formState: { isDirty, isSubmitting },
    apiResponse,
    onSubmit,
  } = useSettingsForm({});

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
      <Button variant="primary" disabled={!isDirty} isLoading={isSubmitting}>
        Save
      </Button>
    </form>
  );
};
