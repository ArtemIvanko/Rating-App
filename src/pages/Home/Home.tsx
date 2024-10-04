import { get, getDatabase, ref } from "firebase/database";
import app from "@/firebaseConfig";
import { useState } from "react";
import { Card } from "@utils/Card";
import styled from "@/DefaultTheme";

export const Home = () => {
  const [users, setUsers] = useState<{ username: string }[]>([]);

  const fetchUsers = async () => {
    const db = getDatabase(app);
    const usersRef = ref(db, "users/");
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      setUsers(Object.values(snapshot.val()));
    } else {
      console.log("No data available");
    }
  };

  fetchUsers();

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
});
