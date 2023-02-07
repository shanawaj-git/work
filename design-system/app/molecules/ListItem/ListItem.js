import React from 'react';
import PropTypes from 'prop-types';
import { StyledListItem } from './StyledListItem';

const ListItem = props => {
  const {
    leftText,
    className,
    disabled,
    placeholder,
    icon,
    onChange,
    defaultValue,
    multiline,
    value,
  } = props;
  return (
    <StyledListItem
      multiline={multiline}
      disabled={disabled}
      leftText={leftText}
      className={className}
      placeholder={placeholder}
      icon={icon}
      onChange={onChange}
      defaultValue={defaultValue}
      value={value}
    />
  );
};
export default ListItem;

ListItem.propTypes = {
  disabled: PropTypes.bool,
  leftText: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
