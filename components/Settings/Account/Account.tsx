import { UserSettingsSchema } from "@/schemas/UserSettingsSchema";
import { useSettingsForm } from "@/hooks/useSettingsForm/useSettingsForm";
import { Alert } from "@/components/ui/Alert/Alert";
import { Button } from "@/components/ui/Button/Button";
import { Label } from "@/components/ui/Label/Label";
import { Input } from "@/components/ui/Input/Input";

interface IAccountProps {
  name: string;
}

interface FormValues extends IAccountProps {}

export const Account: React.FC<IAccountProps> = ({ name }) => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    isLoading,
    apiResponse,
    submitFn,
  } = useSettingsForm<FormValues>({
    schema: UserSettingsSchema,
    defaultValues: { name: name },
  });

  return (
    <form onSubmit={submitFn} className="text-left m-2">
      <Label htmlFor="name">Name</Label>
      <Input
        {...register("name")}
        type="text"
        placeholder="Your name"
        error={errors.name}
        id="name"
      />
      {apiResponse && (
        <Alert isError={apiResponse.isError}>{apiResponse.text}</Alert>
      )}
      <Button
        variant="primary"
        disabled={!isValid || !isDirty}
        isLoading={isLoading}
      >
        Save
      </Button>
    </form>
  );
};
