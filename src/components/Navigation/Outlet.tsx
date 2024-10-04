import { FC } from "react";
import { Outlet as ReactOutlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import styled from "@/DefaultTheme";

export const Outlet: FC = () => (
  <Root>
    <Navigation />
    <ContentWrapper>
      <ReactOutlet />
    </ContentWrapper>
  </Root>
);

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});

const ContentWrapper = styled("main")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "2rem",
  marginTop: "5rem",
  [theme.breakpoints.up("lg")]: {
    padding: "2.5rem 5rem",
  },
}));
