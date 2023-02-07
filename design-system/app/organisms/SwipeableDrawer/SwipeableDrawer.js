import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  StyledSwipeableDrawer,
  StyledPuller,
} from './styledComponents';

const drawerBleeding = 130;

const SwipeableDrawer = props => {
  const {
    children,
    modalHeightInPercent,
    modalWidthInPercent,
    anchor,
    isOpen,
    onOpen,
    onClose,
    hideBackdrop,
    hasRoundedCorners,
    hasBlurBackground,
    others,
  } = props;

  return (
    <StyledSwipeableDrawer
      anchor={anchor}
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      modalHeightInPercent={modalHeightInPercent}
      hideBackdrop={hideBackdrop}
      modalWidthInPercent={modalWidthInPercent}
      hasBlurBackground={hasBlurBackground}
      hasRoundedCorners={hasRoundedCorners}
      {...others}
    >
      <>
        <StyledPuller />
        <Container>{children}</Container>
      </>
    </StyledSwipeableDrawer>
  );
};

export default SwipeableDrawer;

SwipeableDrawer.defaultProps = {
  modalHeightInPercent: 40,
  modalWidthInPercent: 100,
  anchor: 'bottom',
  isOpen: false,
  hideBackdrop: false,
  hasRoundedCorners: true,
  hasBlurBackground: false,
  others: {},
};

SwipeableDrawer.propTypes = {
  children: PropTypes.object.isRequired,
  modalHeightInPercent: PropTypes.number,
  modalWidthInPercent: PropTypes.number,
  anchor: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
  isOpen: PropTypes.bool,
  hideBackdrop: PropTypes.bool,
  hasBlurBackground: PropTypes.bool,
  hasRoundedCorners: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  others: PropTypes.object,
};
