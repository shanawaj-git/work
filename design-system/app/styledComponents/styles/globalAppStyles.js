import { createGlobalStyle } from 'styled-components';

const GlobalAppStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  html {
    box-sizing: border-box;
    text-size-adjust: 100%;
  }

  body {
    font-family: 'Poppins';
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    margin: 0;
    font-size: 1rem;
  }

  html * {
    box-sizing: inherit;
  }

  /* https://cssreset.com/scripts/eric-meyer-reset-css/ */
  /* http://html5doctor.com/html-5-reset-stylesheet/ */
  *, h1 {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  
  hr {
    border-top: 1px inset;
  }

  /* From  defaultRootStyle in /imports/app/molecules/Buttons/Button/styles */
  button {
    cursor: pointer;

    
  }

  body.using-mouse &:focus {
    outline: none;
    box-shadow: none;
  }

  li.root {
    display: block;
  }

  /* This is a rule to hide all marketing pixels which are attached to body. */
  /* In some cases they are causing visual artifacts, that's why we always want to be sure */
  /* that they are hidden */
  body > img {
    position: absolute;
    top: 0;
    right: 200%;
  }

  img {
    pointer-events: none;
  }
`;

export { GlobalAppStyles };
