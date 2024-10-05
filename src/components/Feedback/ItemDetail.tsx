import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { RatingComponent } from "@shared/Feedback/Rating/RatingComponent";
import { AverageRating } from "@shared/Feedback/Rating/AverageRating";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "@/firebaseConfig";
import { useParams } from "react-router-dom";

interface Item {
  title: string;
  description: string;
}

export const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemId) {
      setError("Invalid Item ID.");
      setLoading(false);
      return;
    }

    const database = getDatabase(app);
    const itemRef = ref(database, `users/${itemId}`);

    const unsubscribe = onValue(itemRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setItem(data);
      } else {
        setError("Item not found.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [itemId]);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {item?.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {item?.description}
      </Typography>

      <AverageRating itemId={itemId} />
      <RatingComponent itemId={itemId} />
    </Box>
  );
};
