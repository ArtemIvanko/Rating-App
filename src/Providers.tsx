import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { defaultTheme } from "./DefaultTheme";

interface IProvidersProp {
  children: ReactNode;
}

export const Providers = ({ children }: IProvidersProp) => (
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <GlobalStyles styles={{ "html, body, #root": { height: "100vh" } }} />
    {children}
  </ThemeProvider>
);
