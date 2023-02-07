import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';

export const StyledRadioButton = styled(props => {
  const { groupLabel, row, defaultSelect, groupName } = props;
  return (
    <>
      <FormLabel component="legend">{groupLabel}</FormLabel>
      <RadioGroup
        row={row}
        aria-label={groupLabel}
        defaultValue={defaultSelect}
        name={groupName}
      >
        {renderRadioButtons(props)}
      </RadioGroup>
    </>
  );
})();

const renderRadioButtons = ({ values, disabled, onChange }) => {
  const radios = [];
  const keys = Object.keys(values);

  keys.forEach(key => {
    radios.push(
      <FormControlLabel
        key={key}
        value={values[key]}
        control={<Radio />}
        label={key}
        disabled={disabled}
        onChange={onChange}
      />,
    );
  });

  return radios;
};
