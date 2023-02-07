/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import StoryWrapper from 'molecules/utility/StoryWrapper';
import TimePicker from './TimePicker';

export default {
  title: 'Components/TimePicker',
  component: TimePicker,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC', 'AUTOMOTIVE'] },
    },
    children: { table: { disable: true } },
    others: { table: { disable: true } },
  },
};

const defaultProps = {
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

const Template = args => {
  const [value, setValue] = useState(args.value);

  return (
    <StoryWrapper themeVariant={args.themeType}>
      <TimePicker {...args} value={value} onChange={setValue} />
    </StoryWrapper>
  );
};

export const BasicTemplate = Template.bind({});
BasicTemplate.args = {
  ...defaultProps,
};

export const TimeDisabledInBetweenTemplate = Template.bind({});
TimeDisabledInBetweenTemplate.args = {
  ...defaultProps,
  shouldDisableTime: time => ['12:00', '13:00'].includes(time),
};

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
  ...defaultProps,
  openByDefault: true,
};
