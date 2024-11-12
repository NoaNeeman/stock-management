import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
  * {
    box-sizing: border-box;
  }
  
`;

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
