import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Rating, RatingProps, Typography } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";
import { get, getDatabase, ref, set } from "firebase/database";
import app from "@/firebaseConfig";

interface RatingComponentProps extends RatingProps {
  itemId?: string;
}

export const RatingComponent = ({ itemId }: RatingComponentProps) => {
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchUserRating = async () => {
      if (!user || !itemId) return;

      try {
        const database = getDatabase(app);
        const ratingRef = ref(database, `items/${itemId}/ratings/${user.uid}`);
        const ratingSnapshot = await get(ratingRef);

        if (ratingSnapshot.exists()) {
          const userRating = ratingSnapshot.val();
          setValue(userRating.rating);
        }
      } catch (error) {
        throw new Error("Failed to fetch user rating.");
      }
    };

    fetchUserRating();
  }, [itemId, user]);

  const handleSubmit = async () => {
    if (!user) {
      setMessage("You must be logged in to rate.");
      return;
    }

    if (value === null) {
      setMessage("Please select a rating.");
      return;
    }

    try {
      const database = getDatabase(app);
      const userRef = ref(database, `users/${user.uid}`);
      const ratingRef = ref(database, `items/${itemId}/ratings/${user.uid}`);

      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();

      await set(ratingRef, {
        username: userData.username,
        date: new Date().toISOString(),
        rating: value,
      });

      setMessage("Feedback submitted successfully!");
    } catch (error: any) {
      setMessage("Failed to submit rating.");
    }
  };

  return (
    <Box mt={2}>
      <Typography component="legend">Rate this item:</Typography>
      <Rating
        name="rating"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Box mt={1}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Rating
        </Button>
      </Box>
      {message && (
        <Typography variant="body2" color="textSecondary" mt={1}>
          {message}
        </Typography>
      )}
    </Box>
  );
};
