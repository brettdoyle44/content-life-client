import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background} !important;
    color: ${(props) => props.theme.textColor};
    font-family: 'Nunito Sans', sans-serif;
    text-align: center;
    font-weight: 400;
    margin: 0;
  }
`;

export const lightTheme = {
  main: '#4F9DA6',
  secondary: '#Ff5959',
  textColor: '#071E3D',
  warning: '#F9BF3B',
  info: '#1F4287',
  white: '#FFFFFF',
  background: '#F3F4F7',
};

export const darkTheme = {
  main: '#4F9DA6',
  secondary: '#Ff5959',
  textColor: '#F3F4F7',
  warning: '#F9BF3B',
  info: '#1F4287',
  white: 'rgba(255,255,255,0.2)',
  background: '#071E3D',
};
