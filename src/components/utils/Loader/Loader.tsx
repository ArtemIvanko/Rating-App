import styled from "@/DefaultTheme";
import { CircularProgress } from "@mui/material";
import { memo } from "react";

export const Loader = memo(() => (
  <Root>
    <CircularProgress />
  </Root>
));

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  width: "100%",
});
