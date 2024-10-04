import styled from "@/DefaultTheme";
import { Avatar, Card as MuiCard } from "@mui/material";

export interface ICardProps {
  username: string;
}

export const Card = ({ username }: ICardProps) => {
  return (
    <StyledCard>
      <Avatar alt="Profile picture" src="" />
      <UserInfo>
        <div>{username}</div>
        <div>123</div>
      </UserInfo>
    </StyledCard>
  );
};

const StyledCard = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "5rem",
  width: "15rem",
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
