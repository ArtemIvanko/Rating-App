import { Form, FormTextField, PasswordFieldText } from "@utils/Form";
import { useLogin } from "@/hooks/useAuth";

export const Login = () => {
  const { control, handleSubmit } = useLogin();

  return (
    <Form
      title="Welcome back!"
      subtitle="Please enter your details to sign in"
      buttonLabel="Sign in"
      children={
        <>
          <FormTextField
            name="login"
            control={control}
            label="E-mail"
            placeholder="Please enter your email"
          />
          <PasswordFieldText name="password" control={control} />
        </>
      }
      onSubmit={handleSubmit}
    />
  );
};
