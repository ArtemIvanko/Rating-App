import { MouseEvent, useCallback, useContext, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import styled from "@/DefaultTheme";
import { AuthContext } from "@/context";

interface IProfileBadgeProps {
  onLogoutClick: () => void;
}

export const ProfileBadge = ({ onLogoutClick }: IProfileBadgeProps) => {
  const { user } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = !!anchorEl;

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <Button onClick={handleClick}>
        <Avatar alt="Profile picture" src="" />
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <ProfileInfoContainer>
          <StyledAvatar alt="Profile picture" src="" />
          <div>
            <Typography variant="subtitle1">{user?.username}</Typography>
            <Typography lineHeight="1">{user?.email}</Typography>
            <Typography variant="subtitle2">Profile settings</Typography>
            {user?.admin && <Typography variant="subtitle2">Admin</Typography>}
          </div>
        </ProfileInfoContainer>
        <Divider />
        <MenuItem onClick={onLogoutClick}>Log out</MenuItem>
      </Menu>
    </div>
  );
};

const ProfileInfoContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0 1rem",
});

const StyledAvatar = styled(Avatar)({
  width: "3.5rem",
  height: "3.5rem",
});
