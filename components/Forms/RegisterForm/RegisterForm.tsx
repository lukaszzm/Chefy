import { Alert } from "@/components/UI/Alert";
import { Button } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";
import { Input } from "@/components/UI/Input";
import { useRegister } from "@/hooks/useRegister";

interface RegisterFormProps {
  switchModal: () => void;
}

export const RegisterForm = ({ switchModal }: RegisterFormProps) => {
  const {
    register,
    errors,
    isValid,
    isDirty,
    isLoading,
    submitFn,
    apiResponse,
  } = useRegister();

  return (
    <>
      <form onSubmit={submitFn} className="grid gap-1">
        <Label htmlFor="name">Name</Label>
        <Input
          {...register("name")}
          type="text"
          placeholder="John"
          error={errors.name}
          id="name"
        />
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
          placeholder="password must be at least 8 characters"
          error={errors.password}
          id="password"
        />
        {apiResponse && (
          <Alert variant={apiResponse.isError ? "error" : "success"}>
            {apiResponse.text}
          </Alert>
        )}
        <Button
          variant="primary"
          fullWidth
          disabled={!isDirty || !isValid}
          isLoading={isLoading}
        >
          Submit
        </Button>
      </form>
      <p className="text-center my-2">
        Already have an account?
        <a
          onClick={switchModal}
          className="cursor-pointer font-medium mx-2 text-primary hover:text-primary-hover transition duration-150 ease-in-out hover:underline"
        >
          Sign in here!
        </a>
      </p>
    </>
  );
};
