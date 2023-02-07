import { Tab, Tabs } from '@mui/material';
import React from 'react';
import styled, { css } from 'styled-components';
import { colorSelector } from 'themes';

import {
  defaultLabelStyle,
  defaultRootStyle,
  labelStyles,
  rippleStyle,
  tabLabelContainerStyles,
  tabRootStyles,
} from './styles';

export const StyledTab = styled(
  ({ classes, size, label, isActive, ...other }) => (
    <Tab
      {...other}
      label={label}
      TouchRippleProps={{ style: rippleStyle }}
      classes={{
        root: 'root',
      }}
    />
  ),
)`
  &.root {
    min-width: ${props => tabRootStyles[props.size].minWidth};
    padding: ${props => tabLabelContainerStyles[props.size].padding};
    font-family: ${defaultLabelStyle.fontFamily};
    font-weight: ${defaultLabelStyle.fontWeight};
    text-transform: ${defaultLabelStyle.textTransform};

    &:hover {
      color: ${props => labelStyles[`${props.isActive}`].hover.color};
    }
  }

  &&.Mui-selected {
    color: ${colorSelector('White')};
    font-weight: 600;
    font-size: 14px;

    background-color: ${props =>
      labelStyles[`${props.isActive}`].backgroundColor};
    border-radius: 10px;
  }
`;

export const StyledTabs = styled(
  ({
    classes,
    size,
    onChangeCallback,
    preSelectedTab,
    tabs,
    underline,
    ...other
  }) => (
    <Tabs
      {...other}
      classes={{
        root: 'root',
        indicator: 'indicator',
        scrollable: 'scrollable',
        flexContainer: 'flexContainer',
      }}
    />
  ),
)`
  ${props =>
    props.underline &&
    css`
      position: relative;

      ::after {
        content: '';
        position: absolute;
        display: block;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        border: 0.5px solid ${props.theme.color.g400};
        z-index: ${props.theme.layer.modal};
      }
    `}

  &.root {
    background-color: ${defaultRootStyle.backgroundColor};
    background: ${colorSelector('P100')};
    border-radius: 10px;

    min-height: ${props => tabRootStyles[props.size].minHeight};
  }

  & .indicator {
    visibility: hidden;
  }

  & .scrollable {
    overflow-x: 'scroll';
    scrollbar-width: none;
  }

  & .scrollable::-webkit-scrollbar {
    display: none;
  }
`;
