import { Theme, ThemeOptions } from "@mui/material";
import { UseMediaQueryOptions } from "@mui/material/useMediaQuery";

declare module "@mui/material" {
  interface PaletteColor {
    logo?: string;
    bg?: string;
  }

  interface SimplePaletteColorOptions {
    logo?: string;
    bg?: string;
  }

  interface CustomTheme extends Theme {}

  interface CustomThemeOptions extends ThemeOptions {}

  export function createTheme(options?: CustomThemeOptions): CustomTheme;

  export function useMediaQuery<Theme = CustomTheme>(
    queryInput: string | ((theme: Theme) => string),
    options?: UseMediaQueryOptions,
  ): boolean;
}
