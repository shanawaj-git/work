import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import { getTheme } from 'themes';
import {
  createMaterialUiTheme,
  GlobalAppStyles,
} from 'styledComponents/styles';
import 'tailwind.css';
import { GlobalTheme } from '../../../utils/globalTheme';

const StoryWrapper = props => {
  const { children, themeVariant = 'DEFAULT' } = props;

  GlobalTheme.setTheme(themeVariant);

  const [{ theme }] = useState(getTheme());
  const [muiTheme] = useState(createMaterialUiTheme(theme));
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalAppStyles />
        <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};

StoryWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  themeVariant: PropTypes.string,
};

export default StoryWrapper;
