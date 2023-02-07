import React from 'react';
import PropTypes from 'prop-types';

export const Img = props => {
  const { src, alt, ...others } = props;
  return <img src={src} alt={alt} {...others} />;
};

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
