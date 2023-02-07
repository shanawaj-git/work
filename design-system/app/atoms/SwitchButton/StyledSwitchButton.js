import styled from 'styled-components';
import { Switch } from '@mui/material';
import React from 'react';
import { colorSelector } from 'themes';

const pxToRem = (px, oneRemPx = 17) => `${px / oneRemPx}rem`;

const borderWidth = 2;
const size = pxToRem(20.5);
const gap = (34 - 22) / 2;

export const StyledSwitchButton = styled(props => <Switch {...props} />)(
  () => ({
    color: colorSelector('c200'),
    '.MuiSwitch-track': {
      position: 'absolute',
      opacity: `1`,
      borderRadius: '20px',
      borderWidth,
      backgroundColor: colorSelector('c200'),
      border: `1px solid ${colorSelector('g100')}`,
      boxSizing: 'border-box',
      top: '9%',
      left: '1px',
      height: '65%',
      width: '80%',
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      backgroundColor: colorSelector('c100'),
      width: size,
      height: size,
    },
    '& .MuiSwitch-switchBase': {
      padding: pxToRem(gap),
      left: '-2px',
    },

    '& .Mui-checked ': {
      '.MuiSwitch-thumb': {
        backgroundColor: colorSelector('c200'),
      },
    },

    '&& .Mui-checked+.MuiSwitch-track': {
      opacity: 1,
      backgroundColor: colorSelector('c100'),
    },

    '& .Mui-disabled+.MuiSwitch-track': {
      background: colorSelector('g100'),
      opacity: `${1}!important`,
      border: 'none',
    },

    '& .Mui-disabled': {
      '>.MuiSwitch-thumb': {
        backgroundColor: colorSelector('g300'),
      },
    },
  }),
);
