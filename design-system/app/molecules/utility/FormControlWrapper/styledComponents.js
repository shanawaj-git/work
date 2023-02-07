import {
  FormControl as FormControlMui,
  FormHelperText as FormHelperTextMui,
} from '@mui/material';

import styled from 'styled-components';
import { colorSelector } from 'themes';

export const FormControl = styled(FormControlMui).attrs(() => ({
  classes: { root: 'root' },
}))`
  &.root {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: auto;
    width: 100%;

    && * {
      cursor: ${props => props.disabled && 'no-drop'};
    }
  }
`;

export const FormHelperText = styled(FormHelperTextMui).attrs(() => ({
  classes: { root: 'root' },
}))`
  &.root {
    color: ${colorSelector('p400')};
    margin: 2px 15px 0;
    font-size: 12px;
    font-weight: 6400;
    padding-bottom: 2px;
    width: 100%;
    &.Mui-error {
      color: ${colorSelector('error4')};
      font-weight: 600;
    }
  }
`;
