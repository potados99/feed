import App from "./ui/App";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import GlobalStyle from "./ui/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./ui/styles/theme";
import { SystemThemeProvider } from "./ui/styles/SystemThemeProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <SystemThemeProvider>
      <GlobalStyle />
      <HashRouter>
        <App />
      </HashRouter>
    </SystemThemeProvider>
  </React.StrictMode>,
);
