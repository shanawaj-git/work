import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  html,
  body {
	display: flex;
	flex: 1;
    height: 100%;
    width: 100%;
	max-height: 100%;
  }

  body {
	font-family: 'Poppins';
  }

  body.fontLoaded {
	font-family: 'Poppins';
  }

  #app {
    min-height: 100%;
    min-width: 100%;
	display: flex;
  }

  p,
  label span {
	font-family: 'Poppins';
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
