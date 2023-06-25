import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  body {
    box-sizing: border-box;
    background-color: #000;
  }
  input {
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
