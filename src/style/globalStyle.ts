import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  body {
    box-sizing: border-box;
  }
  input {
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
