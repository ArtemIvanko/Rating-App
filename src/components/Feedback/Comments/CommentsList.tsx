import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "@/firebaseConfig";

interface Comment {
  commentId: string;
  userId: string;
  username: string;
  comment: string;
  timestamp: number;
}

interface CommentsListProps {
  itemId?: string;
}

export const CommentsList: React.FC<CommentsListProps> = ({ itemId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const database = getDatabase(app);
    const commentsRef = ref(database, `items/${itemId}/comments`);

    const unsubscribe = onValue(
      commentsRef,
      (snapshot) => {
        const data = snapshot.val();
        const commentsList: Comment[] = [];

        if (data) {
          Object.entries(data).forEach(
            ([commentId, commentData]: [string, any]) => {
              commentsList.push({
                commentId,
                userId: commentData.userId,
                username: commentData.username,
                comment: commentData.comment,
                timestamp: commentData.timestamp,
              });
            },
          );

          commentsList.sort((a, b) => b.timestamp - a.timestamp);
        }

        setComments(commentsList);
      },
      () => {
        throw new Error("Failed to fetch comments.");
      },
    );

    return () => unsubscribe();
  }, [itemId]);

  return (
    <div>
      <Typography variant="h6">Comments:</Typography>
      {comments.length === 0 ? (
        <Typography variant="body2">No comments yet.</Typography>
      ) : (
        <List>
          {comments.map((comment) => (
            <React.Fragment key={comment.commentId}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={comment.username}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {new Date(comment.timestamp).toLocaleString()}
                      </Typography>
                      {` — ${comment.comment}`}
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </div>
  );
};
