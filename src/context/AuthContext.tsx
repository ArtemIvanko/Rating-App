import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

interface IUserData {
  email: string;
  userName: string;
  password: string;
}

interface IAuthContextValue {
  isFetching: boolean;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
  isUserLoggedIn: boolean;
  user?: IUserData | null;
}

export const AuthContext = createContext<IAuthContextValue>(
  {} as IAuthContextValue,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [user, setUser] = useState<IUserData | null>(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return unsubscribe;
  }, []);

  const initializeUser = async (currentUser: any) => {
    if (currentUser) {
      setUser({ ...currentUser });
      setUserLoggedIn(true);
    } else {
      setUser(null);
      setUserLoggedIn(false);
    }
  };

  const contextValue = useMemo(
    () => ({ isFetching, setIsFetching, user, isUserLoggedIn }),
    [isFetching, user, isUserLoggedIn],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
