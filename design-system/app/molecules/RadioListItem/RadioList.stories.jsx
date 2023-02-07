import React from 'react';
import RadioList from './RadioList';
import StoryWrapper from 'molecules/utility/StoryWrapper';

export default {
  title: 'Components/Lists/RadioList',
  component: RadioList,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

const props = {
  values: {
    Male: {
      title: 'Near My Current Location',
      subTitle: 'Collect from a location near you',
    },
    Female: {
      title: 'Near My Current Location',
      subTitle: 'Collect from a location near you',
    },
  },
  defaultSelect: 'Male',
  groupName: 'radio-button-group',
  disabled: false,
};

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>
    <RadioList {...args} />
  </StoryWrapper>
);

export const PrimaryRadioList = Template.bind({});
export const DisabledRadioList = Template.bind({});

PrimaryRadioList.args = { ...props };

DisabledRadioList.args = {
  ...props,
  disabled: true,
};
