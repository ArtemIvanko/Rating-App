import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import app, { auth } from "@/firebaseConfig";

const schema = yup
  .object({
    username: yup.string().required("User Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

type FormValue = yup.InferType<typeof schema>;

export const useSignUp = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const { control, handleSubmit } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const handleFormSubmit = useCallback(
    async (data: FormValue) => {
      if (isRegistered) return;

      setIsRegistered(true);

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password,
        );
        const user = userCredential.user;

        const database = getDatabase(app);

        if (!user) {
          throw new Error("User not found after registration.");
        }

        const userRef = ref(database, `users/${user.uid}`);
        await set(userRef, {
          username: data.username,
          email: data.email,
          createdAt: new Date().toISOString(),
        });

        window.location.reload();
      } catch (error: any) {
        throw new Error(`Error while getting data: ${error}`);
      } finally {
        setIsRegistered(false);
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
