import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Spinner = props => {
  const { variant } = props;
  return (
    <img
      className="spinner-animation"
      alt=""
      src={getSpinnerVariantName(variant)}
    />
  );
};

export const getSpinnerVariantName = variant =>
  variant === 'light'
    ? require('./spinner_light.svg')
    : require('./spinner_dark.svg');

Spinner.propTypes = {
  variant: PropTypes.string,
};

export default Spinner;
