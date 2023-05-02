import type { Area } from "@/interfaces";
import { isItemChosen } from "@/utils/isItemChosen";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import { Checkbox } from "@/components/UI/Checkbox";
import { Alert } from "@/components/UI/Alert";
import { Button } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";

interface IAreasProps {
  allAreas: Area[];
  checkedByDefaultAreas: Area[];
}

export const Areas: React.FC<IAreasProps> = ({
  allAreas,
  checkedByDefaultAreas,
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
    <form onSubmit={submitFn} className="grid gap-1 text-left m-2">
      <Label htmlFor="Areas">Areas</Label>
      <ul className="flex flex-wrap">
        {allAreas.map((el) => (
          <Checkbox
            {...register("prefferedAreas")}
            key={el.id}
            id={el.id}
            text={el.name}
            isCheckedByDefault={isItemChosen(el, checkedByDefaultAreas)}
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
