import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { getStyleValue } from './functions';
import { defaultLabelStyle, defaultRootStyle, sizeStyles } from './styles';

const defaultRootStyleCSS = props => `
  display: flex;
  cursor: ${defaultRootStyle.cursor};
  font-family: ${defaultRootStyle.fontFamily};
  border-width: ${getStyleValue(props, 'borderWidth')};
  border-color: ${getStyleValue(props, 'borderColor')};
  border-style: ${getStyleValue(props, 'borderStyle')};
  text-transform: ${getStyleValue(props, 'textTransform')};
  box-shadow: ${getStyleValue(props, 'boxShadow')};
  &:hover {
    color: ${getStyleValue(props, 'color', 'hover')};
    background: ${getStyleValue(props, 'backgroundColor', 'hover')};
    box-shadow: ${getStyleValue(props, 'boxShadow', 'hover')};
  }

  &:active {
    color: ${getStyleValue(props, 'color', 'active')};
    background: ${getStyleValue(props, 'backgroundColor', 'active')};
  }

  &:disabled {
    color: ${getStyleValue(props, 'color', 'disabled')};
    background: ${getStyleValue(props, 'backgroundColor', 'disabled')};
    border-style: ${getStyleValue(props, 'borderStyle', 'disabled')};
  }

  height: ${getStyleValue(props, 'height', null, 'size', sizeStyles)};
  min-width: ${getStyleValue(props, 'width', null, 'size', sizeStyles)};
  border-radius: ${getStyleValue(props, 'borderRadius')};
  font-size: ${getStyleValue(props, 'fontSize', null, 'size', sizeStyles)};
  line-height: ${getStyleValue(props, 'lineHeight', null, 'size', sizeStyles)};
  padding: ${getStyleValue(props, 'padding', null, 'size', sizeStyles)};
`;

export const StyledButton = styled(
  ({
    isLoading,
    colorStyle,
    size,
    className,
    disabledTooltipText,
    ...other
  }) => (
    <Button
      {...other}
      classes={{
        // NOTE: This is for prevent blinking by rerendering
        root: ['root', className].join(' ').trim(),
        label: 'label',
        text: 'text',
      }}
    />
  ),
)`
  &.loading {
    ${props => defaultRootStyleCSS(props)}
  }

  &&.loading {
    color: ${props => getStyleValue(props, 'color', 'loading')};
    background: ${props => getStyleValue(props, 'backgroundColor', 'loading')};
  }

  &.root {
    ${props => defaultRootStyleCSS(props)}
    background: ${props => getStyleValue(props, 'backgroundColor')};
    color: ${props => getStyleValue(props, 'color')};
  }

  .label {
    text-transform: ${defaultLabelStyle.textTransform};
    padding-left: ${props =>
      getStyleValue(props, 'labelPaddingLeft', null, 'size', sizeStyles)};
    padding-right: ${props =>
      getStyleValue(props, 'labelPaddingRight', null, 'size', sizeStyles)};
  }

  &.text {
    padding: ${props =>
      getStyleValue(props, 'textPadding', null, 'size', sizeStyles)};
  }
`;
