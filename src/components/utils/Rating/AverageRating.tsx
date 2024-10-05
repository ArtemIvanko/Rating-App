import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "@/firebaseConfig";

interface AverageRatingProps {
  itemId?: string;
}

export const AverageRating = ({ itemId }: AverageRatingProps) => {
  const [average, setAverage] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);

  useEffect(() => {
    if (!itemId) return;

    const database = getDatabase(app);
    const ratingsRef = ref(database, `items/${itemId}/ratings`);

    const unsubscribe = onValue(
      ratingsRef,
      (snapshot) => {
        const ratingsData = snapshot.val();

        if (ratingsData) {
          const ratingsArray = Object.values(ratingsData);
          const total = ratingsArray.reduce(
            (acc: number, rating: any) => acc + rating.rating,
            0,
          );
          const averageRating = total / ratingsArray.length;

          setAverage(averageRating);
          setTotalRatings(ratingsArray.length);
        } else {
          setAverage(0);
          setTotalRatings(0);
        }
      },
      (error) => {
        throw new Error("Failed to fetch ratings data.");
      },
    );

    return () => unsubscribe();
  }, [itemId]);

  return (
    <div>
      <Typography variant="h6">
        Average Rating: {average.toFixed(1)} / 5.0
      </Typography>
      <Typography variant="body2">Based on {totalRatings} ratings</Typography>
    </div>
  );
};
