import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { RatingComponent } from "@shared/Feedback/Rating/RatingComponent";
import { AverageRating } from "@shared/Feedback/Rating/AverageRating";
import { useParams } from "react-router-dom";
import { CommentComponent } from "@shared/Feedback/Comments/CommentComponent";
import { CommentsList } from "@shared/Feedback/Comments/CommentsList";

export const ItemDetail = () => {
  const { itemId } = useParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemId) {
      setError("Invalid Item ID.");
      return;
    }
  }, [itemId]);

  if (error) {
    return (
      <div>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <AverageRating itemId={itemId} />
      <RatingComponent itemId={itemId} />
      <CommentComponent itemId={itemId} />
      <CommentsList itemId={itemId} />
    </div>
  );
};
