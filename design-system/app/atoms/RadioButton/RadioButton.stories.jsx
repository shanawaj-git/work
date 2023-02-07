import React from 'react';
import RadioButton from './RadioButton';
import StoryWrapper from 'molecules/utility/StoryWrapper';

export default {
  title: 'Components/Buttons/Radio Button',
  component: RadioButton,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    onChange: { table: { disable: true } },
    groupName: { table: { disable: true } },
    defaultSelect: { table: { disable: true } },
  },
};

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>
    <RadioButton {...args} />
  </StoryWrapper>
);

export const DefaultRadioButton = Template.bind({});

DefaultRadioButton.args = {
  groupLabel: 'Gender',
  values: { Male: 'boy', Female: 'girl' },
  defaultSelect: 'boy',
  groupName: 'radio-button-group',
  disabled: false,
  row: true,
};

export const DisabledRadioButton = Template.bind({});

DisabledRadioButton.args = {
  groupLabel: 'Gender',
  values: { Male: 'boy', Female: 'girl' },
  defaultSelect: 'boy',
  groupName: 'radio-button-group',
  disabled: true,
  row: true,
};

export const UncheckedRadioButton = Template.bind({});

UncheckedRadioButton.args = {
  groupLabel: 'Gender',
  values: { Male: 'boy', Female: 'girl' },
  groupName: 'radio-button-group',
  row: true,
};

export const ColumnRadioButton = Template.bind({});

ColumnRadioButton.args = {
  groupLabel: 'Gender',
  values: { Male: 'boy', Female: 'girl' },
  groupName: 'radio-button-group',
  row: false,
};
