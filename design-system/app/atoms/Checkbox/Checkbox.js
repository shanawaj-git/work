import React from 'react';
import PropTypes from 'prop-types';
import { StyledCheckbox } from './StyledCheckbox';

const Checkbox = props => {
  const {
    disabled,
    color,
    label,
    labelplacement,
    value,
    onClick,
    onChange,
  } = props;

  return (
    <StyledCheckbox
      disabled={disabled}
      color={color}
      label={label}
      labelplacement={labelplacement}
      value={value}
      onClick={onClick}
      onChange={onChange}
    />
  );
};

export default Checkbox;

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelplacement: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};
