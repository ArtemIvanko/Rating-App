import styled from "@/DefaultTheme";
import { Avatar, Card as MuiCard } from "@mui/material";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { AverageRating, RatingComponent } from "@utils/Rating";

export interface ICardProps {
  username: string;
  link: string;
  itemId?: string;
}

export const Card = memo(({ username, link, itemId }: ICardProps) => {
  return (
    <StyledCard>
      <UserInfo>
        <Avatar alt="Profile picture" src="" />
        <NavLink to={link}>
          <p>{username}</p>
        </NavLink>
        <AverageRating itemId={itemId} />
        <RatingComponent itemId={itemId} />
      </UserInfo>
    </StyledCard>
  );
});

const StyledCard = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "30rem",
  width: "20rem",
  background: theme.palette.grey[200],
  margin: "1rem",
  padding: "1rem",
}));

const UserInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 1rem",
});
