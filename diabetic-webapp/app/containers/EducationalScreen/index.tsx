import React, { useState } from 'react';
import PropTypes, { any, InferProps } from 'prop-types';
import { injectIntl } from 'react-intl';
import ReactHtmlParser from 'react-html-parser';
import { cmsEducationalData } from './cms-data';
import {
  CarouselDescription,
  CarouselHeader,
  CarouselImage,
  CarouselNextButton,
  CarouselSkipButton,
  EducationalCarousel,
} from './styledComponents';

const NEW_PRESCRIPTION_SCREEN = 'prescription-upload';
function EducationalScreen({
  intl,
  history,
  location,
}: EducationalScreenTypes) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const caroselData = [];
  const messages = {
    skipButton: intl.formatMessage({
      id: 'skipButton.title',
      defaultMessage: 'Skip',
    }),
    nextButton: intl.formatMessage({
      id: 'nextButton.title',
      defaultMessage: 'Next',
    }),
  };

  function onSkipButtonClick(event) {
    event.stopPropagation();
    event.preventDefault();
    history.push({
      pathname: NEW_PRESCRIPTION_SCREEN,
      state: {},
    });
    return false;
  }

  function onNextButtonClick() {
    if (currentIndex === caroselData.length - 1) {
      history.push({
        pathname: NEW_PRESCRIPTION_SCREEN,
        state: {},
      });
    }
  }

  function onIndexChanged(index) {
    setCurrentIndex(index);
  }

  cmsEducationalData.data.forEach(cmsData => {
    caroselData.push(
      <>
        <CarouselImage>
          <img
            src={cmsData.attributes.header_img.data[0].attributes.imageSrc}
            alt="header_img"
          />
        </CarouselImage>
        <CarouselHeader>
          {ReactHtmlParser(cmsData.attributes.header_text)}
        </CarouselHeader>
        <CarouselDescription>
          {ReactHtmlParser(cmsData.attributes.description)}
        </CarouselDescription>
      </>,
    );
  });

  return (
    <>
      <EducationalCarousel
        content={caroselData}
        position="right"
        maxSteps={caroselData.length}
        direction="ltr"
        onIndexChanged={onIndexChanged}
        backButton
        nextButton
        nextIcon={
          <CarouselNextButton onClick={onNextButtonClick}>
            {messages.nextButton}
          </CarouselNextButton>
        }
        backIcon={
          <CarouselSkipButton onClick={onSkipButtonClick}>
            {messages.skipButton}
          </CarouselSkipButton>
        }
      />
    </>
  );
}

const EducationalScreenPropsTypes = {
  intl: any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

type EducationalScreenTypes = InferProps<typeof EducationalScreenPropsTypes>;

EducationalScreen.propTypes = EducationalScreenPropsTypes;

export default injectIntl(EducationalScreen);
