import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";
import { getDatabase, push, ref, set } from "firebase/database";
import app from "@/firebaseConfig";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormTextField } from "@utils/Form";
import styled from "@/DefaultTheme";

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

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <>
      <StyledForm
        title={"Add a Comment:"}
        onSubmit={handleFormSubmit}
        buttonLabel={"Submit comment"}
      >
        <FormTextField name="comment" control={control} />
      </StyledForm>
      {message && (
        <Typography variant="body2" color="textSecondary" mt={1}>
          {message}
        </Typography>
      )}
    </>
  );
};

const StyledForm = styled(Form)({
  alignItems: "start",
  width: "100%",
});
