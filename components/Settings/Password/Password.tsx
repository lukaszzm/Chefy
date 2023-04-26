import { PasswordSchema } from "@/schemas/PasswordSchema";
import { useSettingsForm } from "@/hooks/useSettingsForm/useSettingsForm";
import { Label } from "@/components/ui/Label/Label";
import { Button } from "@/components/ui/Button/Button";
import { Alert } from "@/components/ui/Alert/Alert";
import { Input } from "@/components/ui/Input/Input";

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