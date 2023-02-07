import React from 'react';
import PropTypes from 'prop-types';
import { StyledRadioList } from './StyledRadioList';

const RadioList = props => {
  const {
    className,
    groupName,
    defaultSelect,
    values,
    disabled,
    onChange,
  } = props;
  return (
    <StyledRadioList
      values={values}
      defaultSelect={defaultSelect}
      groupName={groupName}
      disabled={disabled}
      onChange={onChange}
      className={className}
    />
  );
};
export default RadioList;

RadioList.propTypes = {
  disabled: PropTypes.bool,
  values: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string.isRequired,
    }),
  }),
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  groupName: PropTypes.string,
  defaultSelect: PropTypes.string,
};
