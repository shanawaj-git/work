import React, { useState, useEffect } from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Button from 'atoms/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';
import defaultContent from './defaultContent';

function SwipeableView(props) {
  const {
    direction,
    autoplay,
    position,
    nextButton,
    backButton,
    variant,
    content,
    className,
    maxSteps,
    nextIcon,
    backIcon,
    _ref,
    onIndexChanged,
  } = props;
  const isRtl = direction === 'rtl';
  const AutoPlaySwipeableViews = autoplay
    ? autoPlay(SwipeableViews)
    : SwipeableViews;

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (onIndexChanged) {
      onIndexChanged(activeStep);
    }
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <div className={className} ref={_ref}>
      <AutoPlaySwipeableViews
        style={{
          flex: 1,
          flexDirection: 'flex',
          height: '100%',
        }}
        axis={isRtl ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {content || defaultContent(activeStep)}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant={variant}
        steps={maxSteps}
        position={position}
        activeStep={activeStep}
        nextButton={
          nextButton ? (
            <Button
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              data-testid="next-btn"
            >
              {isRtl ? backIcon : nextIcon}
            </Button>
          ) : null
        }
        backButton={
          backButton ? (
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              data-testid="back-btn"
            >
              {isRtl ? nextIcon : backIcon}
            </Button>
          ) : null
        }
      />
    </div>
  );
}

export default SwipeableView;
SwipeableView.defaultProps = {
  direction: 'rtl',
  autoplay: false,
  position: 'static',
  variant: 'dots',
  nextIcon: <ArrowForwardIcon />,
  backIcon: <ArrowBackIcon />,
};
SwipeableView.propTypes = {
  direction: PropTypes.string,
  position: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  autoplay: PropTypes.bool,
  nextButton: PropTypes.bool,
  backButton: PropTypes.bool,
  nextIcon: PropTypes.element,
  backIcon: PropTypes.element,
  content: PropTypes.any,
  maxSteps: PropTypes.number,
  _ref: PropTypes.any,
  onIndexChanged: PropTypes.func,
};
