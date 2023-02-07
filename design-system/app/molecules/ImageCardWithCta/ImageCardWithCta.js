import React from 'react';
import PropTypes from 'prop-types';
import Typography, { TypographyType } from 'atoms/Typography';
import { ImageCardWithCtaWrapper } from './StyledImageCardWithCta';

const ImageCardWithCta = props => {
  const { className, cardIcon, title, subTitle, buttonIcon, onClick } = props;
  return (
    <div className={className}>
      <ImageCardWithCtaWrapper>
        <img className="image-card-icon" src={cardIcon} alt={title} />

        <div className="image-card-content">
          <Typography
            className="image-card-title"
            typographyType={TypographyType.HEAD_LINE}
          >
            {title}
          </Typography>
          <Typography
            className="image-card-subTitle"
            typographyType={TypographyType.CAPTION}
          >
            {subTitle}
          </Typography>
        </div>
        {buttonIcon && (
          <button type="button" className="image-card-button" onClick={onClick}>
            <img src={buttonIcon} alt={title} />
          </button>
        )}
      </ImageCardWithCtaWrapper>
    </div>
  );
};
export default ImageCardWithCta;

ImageCardWithCta.propTypes = {
  className: PropTypes.string,
  cardIcon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  buttonIcon: PropTypes.string,
  onClick: PropTypes.func,
};
