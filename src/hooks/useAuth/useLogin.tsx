import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const schema = yup.object({
  login: yup.string().required("Login is required"),
  password: yup.string().required("Password is required"),
});

type FormValue = yup.InferType<typeof schema>;

const defaultValues: FormValue = {
  login: "",
  password: "",
};

export const useLogin = () => {
  const { control, handleSubmit } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
  });

  const handleFormSubmit = useCallback(async (data: FormValue) => {
    try {
      console.log(data);
    } catch (error) {
      throw new Error(`Error while getting data: ${error}`);
    }
  }, []);

  return {
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  };
};
