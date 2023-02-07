import React from 'react';
import PropTypes from 'prop-types';

import Typography, { TypographyType } from 'atoms/Typography';
import { HeroSectionWrapper } from './StyledHeroSection';

const HeroSection = props => {
  const { className, image, title, headLine, titleLogo } = props;

  return (
    <div className={className}>
      <HeroSectionWrapper>
        <img src={image} className="title-img" alt={title} />
        <div className="title-container">
          <Typography typographyType={TypographyType.LARGE_TITLE}>
            {title}
          </Typography>
          {titleLogo && (
            <img alt="temp" className="title-logo" src={titleLogo} />
          )}
        </div>
        <Typography
          className="headline"
          typographyType={TypographyType.SUB_HEAD}
        >
          {headLine}
        </Typography>
      </HeroSectionWrapper>
    </div>
  );
};

export default HeroSection;

HeroSection.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  headLine: PropTypes.string.isRequired,
  titleLogo: PropTypes.string,
};
