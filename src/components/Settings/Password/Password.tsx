import { Alert } from "@/components/UI/Alert/Alert";
import { Button } from "@/components/UI/Button/Button";
import { Input } from "@/components/UI/Input/Input";
import { Label } from "@/components/UI/Label/Label";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import { PasswordSchema } from "@/schemas/PasswordSchema";

interface FormValues {
  currentPassword: string;
  newPassword: string;
}

export const Password = () => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    isPending,
    apiResponse,
    submitFn,
  } = useSettingsForm<FormValues>({
    schema: PasswordSchema,
  });

  return (
    <form className="m-2 grid gap-1 text-left" onSubmit={submitFn}>
      <Label htmlFor="currentPassword">Current Password</Label>
      <Input
        {...register("currentPassword")}
        error={errors.currentPassword}
        id="currentPassword"
        placeholder="********"
        type="password"
      />
      <Label htmlFor="newPassword">New Password</Label>
      <Input
        {...register("newPassword")}
        error={errors.newPassword}
        id="newPassword"
        placeholder="********"
        type="password"
      />
      {apiResponse && <Alert variant={apiResponse.isError ? "error" : "success"}>{apiResponse.text}</Alert>}
      <Button disabled={!isValid || !isDirty} isLoading={isPending} variant="primary">
        Save
      </Button>
    </form>
  );
};
