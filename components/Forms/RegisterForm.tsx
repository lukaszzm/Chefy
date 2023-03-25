import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IApiResponse } from "@/interfaces/ApiResponse.interface";
import { Alert } from "@/ui/Alert";
import { Button } from "@/ui/Button";
import { Label } from "@/ui/Label";
import { Input } from "@/ui/Input";

interface IRegisterFormProps {
  switchModal: () => void;
}

interface IFormInputs {
  email: string;
  name: string;
  password: string;
}

export const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
  const { switchModal } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<IFormInputs>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });
  const [apiResponse, setApiResponse] = useState<IApiResponse | null>(null);

  const onSubmit = async (values: IFormInputs) => {
    setApiResponse(null);
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok)
      return setApiResponse({ isError: true, text: data.message });

    setApiResponse({
      isError: false,
      text: data.message,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="name" className="p-1 font-medium">
          Name
        </Label>
        <Input
          {...register("name")}
          type="text"
          placeholder="John"
          error={errors.name}
        />
        <Label htmlFor="email" className="p-1 font-medium">
          Email
        </Label>
        <Input
          {...register("email")}
          type="email"
          placeholder="example@example.com"
          error={errors.email}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password")}
          type="password"
          placeholder="password must be at least 8 characters"
          error={errors.password}
        />
        {apiResponse && (
          <Alert isError={apiResponse.isError} className="mt-2">
            {apiResponse.text}
          </Alert>
        )}
        <Button
          type="primary"
          fullWidth
          disabled={!isDirty || !isValid}
          isLoading={isSubmitting}
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
