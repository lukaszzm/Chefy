import { Alert } from "@/components/UI/Alert/Alert";
import { Button } from "@/components/UI/Button/Button";
import { Input } from "@/components/UI/Input/Input";
import { Label } from "@/components/UI/Label/Label";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import { UserSettingsSchema } from "@/schemas/UserSettingsSchema";

interface AccountProps {
  name: string;
}

export const Account = ({ name }: AccountProps) => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    isPending,
    apiResponse,
    submitFn,
  } = useSettingsForm<AccountProps>({
    schema: UserSettingsSchema,
    defaultValues: { name: name },
  });

  return (
    <form className="m-2 grid gap-1 text-left" onSubmit={submitFn}>
      <Label htmlFor="name">Name</Label>
      <Input {...register("name")} error={errors.name} id="name" placeholder="Your name" type="text" />
      {apiResponse && <Alert variant={apiResponse.isError ? "error" : "success"}>{apiResponse.text}</Alert>}
      <Button disabled={!isValid || !isDirty} isLoading={isPending} variant="primary">
        Save
      </Button>
    </form>
  );
};
