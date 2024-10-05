import { get, getDatabase, ref } from "firebase/database";
import app from "@/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { Card } from "@utils/Card";
import styled from "@/DefaultTheme";
import { AuthContext } from "@/context";
import { Loader } from "@utils/Loader";

interface User {
  uid: string;
  username: string;
}

export const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { isFetching, setIsFetching } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsFetching(true);
      const db = getDatabase(app);
      const usersRef = ref(db, "users");

      try {
        const usersSnapshot = await get(usersRef);

        if (usersSnapshot.exists()) {
          const usersData = usersSnapshot.val();
          const usersList: User[] = Object.entries(usersData).map(
            ([uid, data]: [string, any]) => ({
              uid,
              username: data.username,
            }),
          );
          setUsers(usersList);
        }
      } catch (error) {
        throw new Error("Failed to fetch users data.");
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
      <CardsContainer>
        {users.map((item) => (
          <Card
            username={item.username}
            key={item.uid}
            link={`/item/${item.uid}`}
            itemId={item.uid}
          />
        ))}
      </CardsContainer>
    </Root>
  );
};

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
});

const CardsContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  padding: "1rem",
});
