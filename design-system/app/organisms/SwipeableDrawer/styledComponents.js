import React from 'react';
import { styled as MuiStyled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import styled from 'styled-components';
import Box from '@mui/material/Box';

const blurEffect = {
  'backdrop-filter': 'blur(12px);',
  background: 'rgba(255, 255, 255, 0.1);',
};

const translateUp = {
  transform: `translate(0, 60vh)`,
  visibility: `visible !important`,
};

const getRoundedCornerStyle = anchor => {
  switch (anchor) {
    case 'bottom':
      return {
        borderTopRightRadius: '20px',
        borderTopLeftRadius: '20px',
      };
    case 'top':
      return {
        borderBottomRightRadius: '20px',
        borderBottomLeftRadius: '20px',
      };
    case 'left':
      return {
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
      };
    case 'right':
      return {
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
      };

    default:
      return {};
  }
};

export const StyledSwipeableDrawer = MuiStyled(props => {
  const cleanedUpProps = {
    ...props,
  };

  // delete custom attributes added for styling
  delete cleanedUpProps.modalHeightInPercent;
  delete cleanedUpProps.modalWidthInPercent;
  delete cleanedUpProps.hasBlurBackground;
  delete cleanedUpProps.hasRoundedCorners;

  return <SwipeableDrawer {...cleanedUpProps} />;
})`
	.MuiPaper-root  {
		height: ${props => `${props.modalHeightInPercent}%`};
		width: ${props => `${props.modalWidthInPercent}%`};
		${props => (!props.open ? { ...translateUp } : '')};
		overflow: 'visible';
		${props =>
      props.hasRoundedCorners ? getRoundedCornerStyle(props.anchor) : ''};
		${props => (props.hasBlurBackground ? { ...blurEffect } : '')};
	}
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
`;

export const StyledPuller = MuiStyled(Box)(() => ({
  width: 30,
  height: 6,
  backgroundColor: 'grey',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));
