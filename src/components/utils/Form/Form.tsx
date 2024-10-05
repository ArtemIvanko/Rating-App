import { ReactNode } from "react";
import styled from "@/DefaultTheme";
import { Button, Typography } from "@mui/material";

type IFormProps = {
  children?: ReactNode;
  onSubmit?: () => void;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
};

export const Form = ({
  children,
  onSubmit,
  title,
  subtitle,
  buttonLabel,
}: IFormProps) => (
  <StyledForm onSubmit={onSubmit}>
    <Typography variant="h5">{title}</Typography>
    <Typography variant="body2">{subtitle}</Typography>
    <FieldsContainer>{children}</FieldsContainer>
    <Button type="submit" fullWidth title={buttonLabel}>
      {buttonLabel}
    </Button>
  </StyledForm>
);

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "400px",
  height: "100%",
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
