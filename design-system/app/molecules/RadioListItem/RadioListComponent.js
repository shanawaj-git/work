import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';
import Typography, { TypographyType } from 'atoms/Typography';
import { LABEL_PLACMENT } from 'constants/UIConstants';
import { v4 as uuidV4 } from 'uuid';

export const RadioListComponent = props => {
  const {
    className,
    groupName,
    defaultSelect,
    values,
    disabled,
    onChange,
  } = props;

  const [selected, setSelected] = useState(defaultSelect);

  const toggleActive = e => {
    const value = e?.target?.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <div className={className}>
      <RadioGroup
        aria-label={groupName}
        defaultValue={defaultSelect}
        name={groupName}
      >
        {renderRadioButtons({ values, disabled, toggleActive, selected })}
      </RadioGroup>
    </div>
  );
};

const renderRadioButtons = ({ values, disabled, toggleActive, selected }) => {
  const radios = [];
  const keys = Object.keys(values);

  keys.forEach(key => {
    const isAtive = selected === key;

    radios.push(
      <FormControlLabel
        key={uuidV4()}
        value={key}
        labelPlacement={LABEL_PLACMENT.start}
        disabled={disabled}
        onChange={toggleActive}
        control={
          <Radio
            icon={<span className="unchecked-icon" />}
            checkedIcon={<span className="checked-icon" />}
            disabled={disabled}
          />
        }
        className={`radio-list-item ${isAtive ? 'active' : ''}`}
        label={
          <div>
            <Typography typographyType={TypographyType.HEAD_LINE}>
              {values[key].title}
            </Typography>
            <Typography typographyType={TypographyType.CAPTION}>
              {values[key].subTitle}
            </Typography>
          </div>
        }
      />,
    );
  });

  return radios;
};

RadioListComponent.propTypes = {
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
