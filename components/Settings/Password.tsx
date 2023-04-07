import { PasswordSchema } from "@/schemas/PasswordSchema";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import { Label } from "@/ui/Label";
import { Button } from "@/ui/Button";
import { Alert } from "@/ui/Alert";
import { Input } from "@/ui/Input";

interface FormValues {
  currentPassword: string;
  newPassword: string;
}

export const Password: React.FC = () => {
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
    <form onSubmit={submitFn} className="text-left m-2">
      <Label htmlFor="currentPassword">Current Password</Label>
      <Input
        {...register("currentPassword")}
        type="password"
        placeholder="********"
        error={errors.currentPassword}
      />
      <Label htmlFor="newPassword">New Password</Label>
      <Input
        {...register("newPassword")}
        type="password"
        placeholder="********"
        error={errors.newPassword}
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
