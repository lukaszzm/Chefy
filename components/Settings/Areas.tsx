import type { Area } from "@/interfaces";
import { isItemChosen } from "@/utils/isItemChosen";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import { Checkbox } from "@/ui/Checkbox";
import { Alert } from "@/ui/Alert";
import { Button } from "@/ui/Button";
import { Label } from "@/ui/Label";

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
    handleSubmit,
    formState: { isDirty, isSubmitting },
    apiResponse,
    onSubmit,
  } = useSettingsForm({});

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-left m-2">
      <Label htmlFor="Category">Areas</Label>
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
      <Button variant="primary" disabled={!isDirty} isLoading={isSubmitting}>
        Save
      </Button>
    </form>
  );
};
