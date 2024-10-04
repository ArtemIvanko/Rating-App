import { FC, memo } from "react";
import {
  Dialog as MUIDialog,
  DialogProps as MUIDialogProps,
} from "@mui/material";
import styled from "@/DefaultTheme";

export interface IDialogProps extends MUIDialogProps {
  onClose?: () => void;
  isActive?: boolean;
}

export const Dialog: FC<IDialogProps> = memo(
  ({ onClose, fullWidth = true, children, isActive, ...restDialogProps }) => {
    return (
      <StyledDialog
        {...restDialogProps}
        fullWidth={fullWidth}
        onClose={onClose}
      >
        {children}
      </StyledDialog>
    );
  },
);

const StyledDialog = styled(MUIDialog)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
