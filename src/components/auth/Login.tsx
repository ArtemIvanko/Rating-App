import styled from "@/DefaultTheme";
import { Button, TextField, Typography } from "@mui/material";

export const Login = () => {
  return (
    <Form>
      <Typography variant="h5">Welcome back!</Typography>
      <Typography variant="body2">
        Please enter your details to sign in
      </Typography>
      <FieldsContainer>
        <TextField
          label="E-Mail or Username"
          placeholder="Enter your email/username"
        />
      </FieldsContainer>
      <Button type="submit" variant="contained" fullWidth>
        Sign in
      </Button>
    </Form>
  );
};

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "400px",
  height: "600px",
  background: "white",
  padding: "1rem 2.5rem",
});

const FieldsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  margin: "1.5rem 0",
});
