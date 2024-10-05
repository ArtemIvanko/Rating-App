import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";
import { getDatabase, push, ref, set } from "firebase/database";
import app from "@/firebaseConfig";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface CommentForm {
  comment: string;
}

interface CommentComponentProps {
  itemId?: string;
}

const schema = yup
  .object({
    comment: yup
      .string()
      .required("Comment is required")
      .max(500, "Comment is too long"),
  })
  .required();

export const CommentComponent: React.FC<CommentComponentProps> = ({
  itemId,
}) => {
  const { user } = useContext(AuthContext);
  const { control, handleSubmit, reset } = useForm<CommentForm>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (data: CommentForm) => {
    if (!user) {
      setMessage("You must be logged in to comment.");
      return;
    }

    if (!data.comment.trim()) {
      setMessage("Comment cannot be empty.");
      return;
    }

    try {
      const database = getDatabase(app);
      const commentsRef = ref(database, `items/${itemId}/comments`);
      const newCommentRef = push(commentsRef);
      await set(newCommentRef, {
        userId: user.uid,
        username: user.username || "Anonymous",
        comment: data.comment,
        timestamp: Date.now(),
      });
      setMessage("Comment added successfully!");
      reset();
    } catch (error: any) {
      setMessage("Failed to add comment.");
      throw new Error(`Failed to add comment: ${error.message}`);
    }
  };

  return (
    <div>
      <Typography component="legend">Add a Comment:</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="comment"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Your Comment"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Submit Comment
          </Button>
        </div>
      </form>
      {message && (
        <Typography variant="body2" color="textSecondary" mt={1}>
          {message}
        </Typography>
      )}
    </div>
  );
};
