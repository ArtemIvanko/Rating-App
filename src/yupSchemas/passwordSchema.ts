import * as yup from "yup";

export const passwordSchema = yup
  .string()
  .required()
  .label("Password")
  .min(8, "Password must be at least 8 characters long")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
  );
