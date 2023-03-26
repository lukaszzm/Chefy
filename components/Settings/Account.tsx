import { UserSettingsSchema } from "@/schemas/UserSettingsSchema";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import { Alert } from "@/ui/Alert";
import { Button } from "@/ui/Button";
import { Label } from "@/ui/Label";
import { Input } from "@/ui/Input";

interface IAccountProps {
  name: string;
}

interface FormValues extends IAccountProps {}

export const Account: React.FC<IAccountProps> = ({ name }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    apiResponse,
    onSubmit,
  } = useSettingsForm<FormValues>({
    schema: UserSettingsSchema,
    defaultValues: { name: name },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-left m-2">
      <Label htmlFor="name">Name</Label>
      <Input
        {...register("name")}
        type="text"
        placeholder="Your name"
        error={errors.name}
      />
      {apiResponse && (
        <Alert isError={apiResponse.isError}>{apiResponse.text}</Alert>
      )}
      <Button
        variant="primary"
        disabled={!isValid || !isDirty}
        isLoading={isSubmitting}
      >
        Save
      </Button>
    </form>
  );
};
