import { createTheme } from '@mui/material/styles';

const createMaterialUiTheme = (theme, options) => {
  const { breakpoint, color } = theme;
  const opts = options || {};

  return createTheme({
    palette: {
      primary: {
        light: color.p300,
        main: color.p300,
        dark: color.p300,
        contrastText: color.c200,
      },
      error: {
        light: color.error4,
        main: color.error4,
        dark: color.error4,
        contrastText: color.error4,
      },
      background: {
        default: color.g100,
      },
    },
    breakpoints: {
      values: {
        ...breakpoint,
      },
    },
    typography: {
      useNextVariants: true,
      fontFamily: ['Poppins'].join(','),
    },
    overrides: {
      MuiPickersToolbarText: {
        toolbarTxt: {
          color: color.white,
        },
        toolbarBtnSelected: {
          color: color.white,
        },
      },
      MuiPickersDay: {
        daySelected: {
          color: color.white,
        },
      },
      ...opts.overrides,
    },
  });
};

export { createMaterialUiTheme };
