import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CollapsibleFieldContainer from 'molecules/CollapsibleFieldContainer';

import timeIcon from 'images/time-icon.svg';
import Typography from 'atoms/Typography';
import { TimeContainer } from './styledComponents';

const getDate = timeString => new Date(`1970-01-01T${timeString}:00Z`);
const padStartWithZero = num => String(num).padStart(2, '0');
const getTimeString = date =>
  `${padStartWithZero(date.getUTCHours())}:${padStartWithZero(
    date.getUTCMinutes(),
  )}`;
const getLabelString = timeString => timeString.replace(/^0/, '');
const getCellData = ({ time, value, shouldDisableTime }) => {
  const cellValue = getTimeString(time);
  return {
    value: cellValue,
    label: getLabelString(cellValue),
    isSelected: cellValue === value,
    isDisabled: shouldDisableTime && shouldDisableTime(cellValue) === true,
  };
};
const generateCellsData = ({
  value,
  fromTime,
  toTime,
  interval,
  shouldDisableTime,
}) => {
  const startTime = getDate(fromTime);
  const endTime = getDate(toTime);
  const time = startTime;
  const cellsData = [];
  do {
    cellsData.push(
      getCellData({
        time,
        value,
        shouldDisableTime,
      }),
    );
    time.setTime(time.getTime() + getDate(interval).getTime());
  } while (time.getTime() <= endTime.getTime());

  return cellsData;
};

const getCellContainerClassNames = (selected, disabled) => {
  const classNames = ['timepicker-time-cell'];
  if (selected) {
    classNames.push('selected');
  }
  if (disabled) {
    classNames.push('disabled');
  }
  return classNames.join(' ');
};

const Picker = props => {
  const {
    value,
    fromTime,
    toTime,
    interval,
    onChange,
    shouldDisableTime,
  } = props;

  const [cellsData, setCellsData] = useState([]);
  useEffect(() => {
    setCellsData(
      generateCellsData({
        value,
        fromTime,
        toTime,
        interval,
        shouldDisableTime,
      }),
    );
  }, [value, fromTime, toTime, interval, shouldDisableTime]);

  const onCellClick = cellValue => onChange && onChange(cellValue);

  return (
    <div className="timepicker-container p3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
      {cellsData.map(({ value: cellValue, isSelected, label, isDisabled }) => (
        <TimeContainer
          className={getCellContainerClassNames(isSelected, isDisabled)}
          key={cellValue}
          selected={isSelected}
          disabled={isDisabled}
          onClick={() => !isDisabled && onCellClick(cellValue)}
          data-testid={`div-timepicker-cell-container-${cellValue}`}
        >
          <Typography
            className="time-label"
            selected={isSelected}
            disabled={isDisabled}
            data-testid={`div-timepicker-cell-label-${cellValue}`}
          >
            {label}
          </Typography>
        </TimeContainer>
      ))}
    </div>
  );
};

const TimePicker = props => {
  const { value, label, placeholder, openByDefault } = props;
  return (
    <CollapsibleFieldContainer
      value={value}
      label={label}
      icon={timeIcon}
      placeholder={placeholder}
      openByDefault={openByDefault}
    >
      <Picker {...props} />
    </CollapsibleFieldContainer>
  );
};

export default TimePicker;

TimePicker.defaultProps = {
  value: null,
  fromTime: '07:00',
  toTime: '20:00',
  interval: '01:00',
  onChange: () => {},
  label: 'Time',
  placeholder: 'Select Time',
  shouldDisableTime: null,
  openByDefault: false,
};

TimePicker.propTypes = {
  value: PropTypes.string,
  fromTime: PropTypes.string,
  toTime: PropTypes.string,
  interval: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  shouldDisableTime: PropTypes.func,
  openByDefault: PropTypes.bool,
};

Picker.propTypes = TimePicker.propTypes;
