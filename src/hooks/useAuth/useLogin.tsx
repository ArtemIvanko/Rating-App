import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "@firebase/auth";

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
  const [isSignedIn, setIsSignedIn] = useState(false);

  const { control, handleSubmit } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
  });

  const handleFormSubmit = useCallback(
    async (data: FormValue) => {
      if (!isSignedIn) {
        setIsSignedIn(true);
        await signInWithEmailAndPassword(auth, data.login, data.password);
        window.location.reload();
      }
    },
    [isSignedIn],
  );

  return {
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  };
};
