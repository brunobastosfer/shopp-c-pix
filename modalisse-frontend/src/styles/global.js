import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

  :root {
    --red: #e52e4d;
    --white: #FFF;
    --black: #2F2F2F;
    --alphaBlack: #000000;

    --yellow-500: #F6C76B;
    --gray-50: #686A69;
    --gray-60: #8F8F8F;
    --gray-100: #B6B6B6;
    --gray-150: #B9B9B9;
    --gray-200: #D2D2D2;
    --gray-300: #EBEBEB;
    --gray-400: #ECECEC;
    --gray-500: #F4F4F4;
    --shadow-500: 0px 4px 8px rgba(91, 91, 91, 0.2);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--white);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, select, button {
    font-family: 'Playfair Display', sans-serif;
    font-weight: 400;
  } 

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
