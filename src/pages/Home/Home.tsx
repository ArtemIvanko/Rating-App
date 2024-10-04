import { get, getDatabase, ref } from "firebase/database";
import app from "@/firebaseConfig";
import { useState } from "react";

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
    <div>
      <h1>Home</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};
