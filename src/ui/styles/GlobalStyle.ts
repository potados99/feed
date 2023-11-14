import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    scrollbar-gutter: stable; /*prevent scroll bar pushing layout to left.*/
    background: ${({ theme }) => theme.background};
  }

  body {
    max-width: 600px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @keyframes pulse-animation {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 127, 255, 0.2);
    }
    100% {
      box-shadow: 0 0 0 12px rgba(0, 127, 255, 0);
    }
  }
`;

export default GlobalStyle;