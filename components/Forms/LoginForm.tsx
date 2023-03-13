import { LoginSchema } from "../../schemas/LoginSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@corex/hook-form-yup-resolver";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Alert } from "../UI/Alert";
import { Button } from "../UI/Button";
import { Label } from "../UI/Label";
import { IApiResponse } from "../../interfaces/ApiResponse.interface";
import { Input } from "../UI/Input";

interface ILoginFormProps {
  switchModal: () => void;
}

interface IFormInputs {
  email: string;
  password: string;
}

export const LoginForm: React.FC<ILoginFormProps> = (props) => {
  const { switchModal } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<IFormInputs>({
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
  });
  const [apiResponse, setApiResponse] = useState<IApiResponse | null>(null);

  const onSubmit = async (values: IFormInputs) => {
    const { email, password } = values;
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (!response || !response.ok)
      setApiResponse({
        isError: true,
        text: response?.error || "Something went wrong.",
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="email" className="p-1 font-semibold">
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
          placeholder="********"
          error={errors.password}
        />
        {apiResponse && (
          <Alert className="mt-2" isError>
            {apiResponse.text}
          </Alert>
        )}
        <Button
          type="primary"
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
          className="cursor-pointer font-semibold mx-2 text-primary hover:text-primary-hover transition duration-150 ease-in-out hover:underline"
        >
          Sign up here!
        </a>
      </p>
    </>
  );
};
