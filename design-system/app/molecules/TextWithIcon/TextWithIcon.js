import React from 'react';
import PropTypes from 'prop-types';

import Img from 'atoms/Image';
import Typography, { TypographyType } from 'atoms/Typography';

export const TextWithIcon = props => {
  const { icon, text, sideText, className } = props;
  return (
    <div className={`textWithIcon ${className}`}>
      {icon && <Img src={icon} alt={text} />}

      {text && (
        <Typography typographyType={TypographyType.CAPTION}>{text}</Typography>
      )}

      {sideText && (
        <Typography
          className="textWithIcon-sideText"
          typographyType={TypographyType.CAPTION}
        >
          {sideText}
        </Typography>
      )}
    </div>
  );
};

TextWithIcon.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  sideText: PropTypes.string,
  className: PropTypes.string,
};
