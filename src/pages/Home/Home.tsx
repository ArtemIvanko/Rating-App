import { get, getDatabase, ref } from "firebase/database";
import app from "@/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { Card } from "@utils/Card";
import styled from "@/DefaultTheme";
import { AuthContext } from "@/context";
import { Loader } from "@utils/Loader";

export const Home = () => {
  const [users, setUsers] = useState<{ username: string }[]>([]);
  const { isFetching, setIsFetching } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsFetching(true);
      const db = getDatabase(app);
      const usersRef = ref(db, "users");

      const users = await get(usersRef);

      if (users.exists()) {
        setUsers(Object.values(users.val()));
      }

      setIsFetching(false);
    };

    fetchUsers();
  }, [setIsFetching]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Root>
      <h1>Home</h1>
      {users.map((user) => (
        <Card username={user.username} key={user.username} />
      ))}
    </Root>
  );
};

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
});
