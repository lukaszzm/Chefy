// TODO: Delete this component
export const LoginForm = () => {
  return <p>Login Form</p>;
  //   const { register, handleSubmit, errors, isValid, isDirty, isSubmitting, onSubmit, apiResponse } = useLogin();

  //   return (
  //     <>
  //       <Alert variant="info">
  //         <span className="font-semibold"> Email: </span>
  //         test@test.com
  //         <br />
  //         <span className="font-semibold"> Password: </span>testtest
  //       </Alert>
  //       <form className="grid gap-1" onSubmit={handleSubmit(onSubmit)}>
  //         <Label htmlFor="email">Email</Label>
  //         <Input {...register("email")} error={errors.email} id="email" placeholder="example@example.com" type="email" />
  //         <Label htmlFor="password">Password</Label>
  //         <PasswordInput {...register("password")} error={errors.password} id="password" placeholder="********" />
  //         {apiResponse && <Alert variant="error">{apiResponse.text}</Alert>}
  //         <Button disabled={!isValid || !isDirty} isLoading={isSubmitting} variant="primary" fullWidth>
  //           Submit
  //         </Button>
  //       </form>
  //       <p className="my-2 text-center">
  //         Not have an account?
  //         <a
  //           className="hover:text-primary-hover mx-2 cursor-pointer font-medium text-primary transition duration-150 ease-in-out hover:underline"
  //           onClick={switchModal}
  //         >
  //           Sign up here!
  //         </a>
  //       </p>
  //     </>
  //   );
};
