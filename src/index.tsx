import App from "./ui/App";
import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./ui/styles/GlobalStyle";
import { HashRouter } from "react-router-dom";
import { SystemThemeProvider } from "./ui/styles/SystemThemeProvider";
import "react-loading-skeleton/dist/skeleton.css";

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
