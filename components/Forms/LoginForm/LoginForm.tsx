import { Alert } from "@/components/UI/Alert";
import { Button } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";
import { Input } from "@/components/UI/Input";
import { useLogin } from "@/hooks/useLogin";

interface ILoginFormProps {
  switchModal: () => void;
}

export const LoginForm: React.FC<ILoginFormProps> = ({ switchModal }) => {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    onSubmit,
    apiResponse,
  } = useLogin();

  return (
    <>
      <Alert variant="info">
        <span className="font-semibold"> Email: </span>
        test@test.com
        <br />
        <span className="font-semibold"> Password: </span>testtest
      </Alert>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          type="email"
          placeholder="example@example.com"
          error={errors.email}
          id="email"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password")}
          type="password"
          placeholder="********"
          error={errors.password}
          id="password"
        />
        {apiResponse && <Alert variant="error">{apiResponse.text}</Alert>}
        <Button
          variant="primary"
          fullWidth
          disabled={!isValid || !isDirty}
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </form>
      <p className="text-center my-2">
        Not have an account?
        <a
          onClick={switchModal}
          className="cursor-pointer font-medium mx-2 text-primary hover:text-primary-hover transition duration-150 ease-in-out hover:underline"
        >
          Sign up here!
        </a>
      </p>
    </>
  );
};
