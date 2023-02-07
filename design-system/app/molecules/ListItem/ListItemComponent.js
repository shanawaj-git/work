import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Typography, { TypographyType } from 'atoms/Typography';

export const ListItemComponent = props => {
  const {
    leftText,
    className,
    disabled,
    placeholder,
    icon,
    onChange,
    multiline,
    defaultValue,
  } = props;

  return (
    <div className={className}>
      <div className="text-list-item-wrapper">
        <Typography
          className="text-list-item-left"
          typographyType={TypographyType.HEAD_LINE}
        >
          {leftText}
        </Typography>

        <TextField
          multiline={multiline}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          variant="standard"
          className="list-item-input"
          InputLabelProps={{ shrink: false }}
        />
        {!disabled && icon && <img src={icon} alt={placeholder} />}
      </div>
    </div>
  );
};

ListItemComponent.propTypes = {
  disabled: PropTypes.bool,
  leftText: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func,
  multiline: PropTypes.bool,
  defaultValue: PropTypes.string,
};
