import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';
import { styled } from '@mui/material/styles';

export const StyledCheckbox = styled(props => {
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
    <>
      <FormControlLabel
        label={label}
        labelPlacement={labelplacement}
        disabled={disabled}
        control={
          <Checkbox
            value={value}
            onClick={onClick}
            onChange={onChange}
            color={color}
          />
        }
      />
    </>
  );
})();
