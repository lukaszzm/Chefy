import type { Area } from "@/interfaces";
import { isItemChosen } from "@/utils/isItemChosen";
import { useSettingsForm } from "@/hooks/useSettingsForm/useSettingsForm";
import { Checkbox } from "@/components/ui/Checkbox";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

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
    <form onSubmit={submitFn} className="text-left m-2">
      <Label htmlFor="Areas">Areas</Label>
      <ul role="list" className="flex flex-wrap">
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
        <Alert isError={apiResponse.isError}>{apiResponse.text}</Alert>
      )}
      <Button variant="primary" disabled={!isDirty} isLoading={isLoading}>
        Save
      </Button>
    </form>
  );
};
