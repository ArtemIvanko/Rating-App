import { Dialog } from "@utils/Dialog";
import styled from "@/DefaultTheme";
import { Button } from "@mui/material";
import { Login, SignUp } from "@shared/auth";
import { useDialog } from "@/hooks/useDialog";
import { ProfileBadge } from "@/pages/Profile";
import { useCallback, useContext } from "react";
import { AuthContext } from "@/context";
import { auth } from "@/firebaseConfig";

export const Navigation = () => {
  const { isUserLoggedIn } = useContext(AuthContext);

  const {
    dialogProps: signUpDialogProps,
    open: openSignUpDialog,
    close: closeSignUpDialog,
  } = useDialog({
    onClose: () => {
      closeSignUpDialog();
    },
  });

  const {
    dialogProps: loginDialogProps,
    open: openLoginDialog,
    close: closeLoginDialog,
  } = useDialog({
    onClose: () => {
      closeLoginDialog();
    },
  });

  const handleLogout = useCallback(() => auth.signOut(), []);

  return (
    <NavBar>
      Rating App
      {!isUserLoggedIn ? (
        <div>
          <Button onClick={openLoginDialog}>Log In</Button>
          <Dialog {...loginDialogProps}>
            <Login />
          </Dialog>
          <Button onClick={openSignUpDialog}>Register</Button>
          <Dialog {...signUpDialogProps}>
            <SignUp />
          </Dialog>
        </div>
      ) : (
        <ProfileBadge onLogoutClick={handleLogout} />
      )}
    </NavBar>
  );
};

const NavBar = styled("nav")(({ theme }) => ({
  position: "fixed",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.5rem",
  borderRadius: "0 0 1.25rem 1.25rem",
  background: theme.palette.common.white,
  color: theme.palette.primary.logo,
  boxShadow: `0 1px 3px 0 ${theme.palette.grey[400]}`,
  zIndex: "1299",
  [theme.breakpoints.up("lg")]: {
    padding: "0 2rem",
  },
}));
