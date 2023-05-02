import { PasswordSchema } from "@/schemas/PasswordSchema";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import { Label } from "@/components/UI/Label";
import { Button } from "@/components/UI/Button";
import { Alert } from "@/components/UI/Alert";
import { Input } from "@/components/UI/Input";

interface FormValues {
  currentPassword: string;
  newPassword: string;
}

export const Password = () => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    isLoading,
    apiResponse,
    submitFn,
  } = useSettingsForm<FormValues>({
    schema: PasswordSchema,
  });

  return (
    <form onSubmit={submitFn} className="grid gap-1 text-left m-2">
      <Label htmlFor="currentPassword">Current Password</Label>
      <Input
        {...register("currentPassword")}
        type="password"
        placeholder="********"
        error={errors.currentPassword}
        id="currentPassword"
      />
      <Label htmlFor="newPassword">New Password</Label>
      <Input
        {...register("newPassword")}
        type="password"
        placeholder="********"
        error={errors.newPassword}
        id="newPassword"
      />
      {apiResponse && (
        <Alert variant={apiResponse.isError ? "error" : "success"}>
          {apiResponse.text}
        </Alert>
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
