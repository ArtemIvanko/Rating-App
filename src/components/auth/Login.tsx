import { Form } from "@utils/Form";
import { TextField } from "@mui/material";

export const Login = () => {
  return (
    <Form
      title="Welcome back!"
      subtitle="Please enter your details to sign in"
      buttonLabel="Sign in"
      children={
        <TextField
          label="E-mail or Username"
          placeholder="Enter your email/username"
        />
      }
    />
  );
};
