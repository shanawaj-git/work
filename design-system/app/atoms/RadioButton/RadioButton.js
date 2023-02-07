import React from 'react';
import PropTypes from 'prop-types';
import { StyledRadioButton } from './StyledRadioButton';

const RadioButton = props => {
  const {
    row,
    groupLabel,
    groupName,
    values,
    defaultSelect,
    disabled,
    onChange,
  } = props;

  return (
    <StyledRadioButton
      row={row}
      groupLabel={groupLabel}
      groupName={groupName}
      defaultSelect={defaultSelect}
      values={values}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default RadioButton;

RadioButton.propTypes = {
  row: PropTypes.bool,
  groupLabel: PropTypes.string,
  groupName: PropTypes.string.isRequired,
  values: PropTypes.object,
  defaultSelect: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
