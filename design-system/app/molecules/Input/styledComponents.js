import React from 'react';

import {
  InputAdornment as InputAdornmentMui,
  TextField as TextFieldMui,
} from '@mui/material';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import styled from 'styled-components';
import { styled as styledMUI } from '@mui/material/styles';
import { colorSelector } from 'themes';

export const TextField = styledMUI(TextFieldMui)(({ theme }) => ({
  '& .MuiInput-root': {
    marginTop: '24px',
    fontFamily: 'Poppins',
    width: '100%',

    '&.Mui-error': {
      '& .MuiInputBase-input': {
        borderColor: colorSelector('error4'),
      },
    },

    'input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
      appearance: 'none',
      margin: 0,
    },

    'input[type=number]': {
      appearance: 'textfield',
    },

    '&:after': {
      content: 'none',
    },
    '&:before': {
      content: 'none',
    },
  },

  '.MuiInputLabel-root': {
    fontFamily: 'Poppins',
    marginTop: theme.spacing(0),
    fontSize: '15px',
    transition: 'none',
    transform: 'none',
    color: 'black',
    width: '100%',

    '&.Mui-focused': {
      color: 'black',
    },

    '&.Mui-error': {
      color: 'black',
    },
  },

  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: colorSelector('white'),
    border: '1px solid #E1E1E6;',
    borderRadius: '16px',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '-0.32px',

    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {},

    '&::placeholder': {
      color: colorSelector('c400'),
      opacity: 1,
      fontWeight: 400,
    },

    '&.Mui-disabled': {
      backgroundColor: colorSelector('g600'),
    },
  },
}));
export const InputAdornment = styled(InputAdornmentMui).attrs(props => ({
  classes: {
    root: classNames('root', props.classes?.root),
  },
}))`
  &.root p {
    font-weight: normal;
  }
`;

// TODO: to be moved to its own component
const Img = props => {
  const { src, alt } = props;
  return <img src={src} alt={alt} />;
};

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export const UploadIcon = styled(Img).attrs(() => ({
  src: require('../../images/upload.svg'),
}))`
  width: 17px;
  height: 17px;
`;
