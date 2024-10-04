import { Form, FormTextField, PasswordFieldText } from "@utils/Form";
import { useSignUp } from "@/hooks/useAuth";

export const SignUp = () => {
  const { control, handleSubmit } = useSignUp();

  return (
    <Form
      title="Join us!"
      subtitle="Please enter your details to sign up"
      buttonLabel="Get started"
      children={
        <>
          <FormTextField
            name="username"
            control={control}
            placeholder="That's how we gonna know you"
            label="Username"
          />
          <FormTextField
            name="email"
            control={control}
            placeholder="Enter your email"
            label="E-mail"
          />
          <PasswordFieldText name="password" control={control} />
        </>
      }
      onSubmit={handleSubmit}
    />
  );
};
