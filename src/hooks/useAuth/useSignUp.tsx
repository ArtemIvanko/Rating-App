import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/firebaseConfig";

const schema = yup.object({
  username: yup.string().required().label("User Name"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

type FormValue = yup.InferType<typeof schema>;

export const useSignUp = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const { control, handleSubmit } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const handleFormSubmit = useCallback(
    async (data: FormValue) => {
      if (!isRegistered) {
        setIsRegistered(true);
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        window.location.reload();
      }
    },
    [isRegistered],
  );

  return {
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
    isRegistered,
  };
};
