import styled from "@/DefaultTheme";
import { Outlet } from "react-router";

export const Navigation = () => (
  <Root>
    <div>Navigation</div>
    <Outlet />
  </Root>
);

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});
