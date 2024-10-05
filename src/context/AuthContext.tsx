import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";
import { auth } from "@/firebaseConfig";

interface IUserData {
  email: string | null;
  username: string | null;
  uid: string;
}

interface IAuthContextValue {
  isFetching: boolean;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
  isUserLoggedIn: boolean;
  user: IUserData | null;
}

export const AuthContext = createContext<IAuthContextValue>(
  {} as IAuthContextValue,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [user, setUser] = useState<IUserData | null>(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser: User | null) => {
        if (currentUser) {
          const database = getDatabase();
          const userRef = ref(database, `users/${currentUser.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUser({
              email: userData.email,
              username: userData.username,
              uid: currentUser.uid,
            });
          } else {
            setUser({
              email: currentUser.email,
              username: currentUser.displayName || "Anonymous",
              uid: currentUser.uid,
            });
          }

          setUserLoggedIn(true);
        } else {
          setUser(null);
          setUserLoggedIn(false);
        }
      },
    );

    return unsubscribe;
  }, []);

  const contextValue = useMemo(
    () => ({ isFetching, setIsFetching, user, isUserLoggedIn }),
    [isFetching, user, isUserLoggedIn],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
