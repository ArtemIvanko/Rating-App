import * as yup from "yup";

export const emailSchema = yup
  .string()
  .email("Please enter a valid email")
  .required()
  .label("Email")
  .matches(/@[^.]*\./, "Please enter a valid email");
