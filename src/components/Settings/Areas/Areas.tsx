import { Alert } from "@/components/UI/Alert/Alert";
import { Button } from "@/components/UI/Button/Button";
import { Checkbox } from "@/components/UI/Checkbox/Checkbox";
import { Label } from "@/components/UI/Label/Label";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import type { Area } from "@/interfaces";
import { isItemChosen } from "@/utils/isItemChosen";

interface AreasProps {
  allAreas: Area[];
  checkedByDefaultAreas: Area[];
}

export const Areas = ({ allAreas, checkedByDefaultAreas }: AreasProps) => {
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
    <form className="m-2 grid gap-1 text-left" onSubmit={submitFn}>
      <Label htmlFor="Areas">Areas</Label>
      <ul className="flex flex-wrap">
        {allAreas.map((el) => (
          <Checkbox
            {...register("preferredAreas")}
            id={el.id}
            isCheckedByDefault={isItemChosen(el, checkedByDefaultAreas)}
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
