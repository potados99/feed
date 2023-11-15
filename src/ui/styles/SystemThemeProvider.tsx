import { useMediaQuery } from "react-responsive";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import React, { PropsWithChildren } from "react";

export function SystemThemeProvider({ children }: PropsWithChildren) {
  const systemPrefersDark = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });

  return (
    <ThemeProvider theme={systemPrefersDark ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
}
