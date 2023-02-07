import React from 'react';
import PropTypes from 'prop-types';

import Typography, { TypographyType } from 'atoms/Typography';
import Button from 'atoms/Button';

import { TextWithIcon } from 'molecules/TextWithIcon/TextWithIcon';

export const CardFooter = props => {
  const { className, shouldShowButton = false, details = {} } = props;
  const { titleText, titleSideText, caption, buttonText } = details;
  return (
    <div className={`card-footer ${className}`}>
      <TextWithIcon
        text={titleText}
        sideText={titleSideText}
        className="card-footer-title"
      />
      <Typography
        typographyType={TypographyType.CAPTION}
        className="card-footer-subtitle"
      >
        {caption}
      </Typography>
      {shouldShowButton && (
        <Button variant="contained">
          <div>{buttonText}</div>
        </Button>
      )}
    </div>
  );
};

CardFooter.propTypes = {
  className: PropTypes.string,
  shouldShowButton: PropTypes.bool,
  details: PropTypes.shape({
    buttonText: PropTypes.string,
    titleText: PropTypes.string,
    titleSideText: PropTypes.string,
    caption: PropTypes.string,
  }),
};
