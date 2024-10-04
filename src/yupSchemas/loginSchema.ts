import * as yup from "yup";
import { emailSchema } from "./emailSchema";

export const loginSchema = yup
  .string()
  .required("E-mail or Username is required")
  .test("login", "Invalid E-mail or Username", (value) => {
    if (!value) return false;
    const isEmail = emailSchema.isValidSync(value);
    const isUsername = !isEmail && yup.string().isValidSync(value);
    return isEmail || isUsername;
  });
