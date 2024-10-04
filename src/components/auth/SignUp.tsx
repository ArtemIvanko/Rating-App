import { Form, FormTextField, PasswordFieldText } from "@utils/Form";
import { useSignUp } from "@/hooks";

export const SignUp = () => {
  const { control, handleSubmit } = useSignUp();

  return (
    <Form
      title="Welcome back!"
      subtitle="Please enter your details to sign in"
      buttonLabel="Sign in"
      children={
        <>
          <FormTextField name="username" control={control} />
          <FormTextField name="email" control={control} />
          <PasswordFieldText name="password" control={control} />
        </>
      }
      onSubmit={handleSubmit}
    />
  );
};
