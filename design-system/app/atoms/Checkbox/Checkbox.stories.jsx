import React from 'react';
import Checkbox from './Checkbox';
import StoryWrapper from 'molecules/utility/StoryWrapper';

export default {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    color: { control: { type: 'select', options: ['primary', 'default'] } },
    labelplacement: {
      control: { type: 'select', options: ['top', 'start', 'bottom', 'end'] },
    },
    onClick: { table: { disable: true } },
    onChange: { table: { disable: true } },
    value: { table: { disable: true } },
  },
};

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>
    <Checkbox {...args} />
  </StoryWrapper>
);

export const PrimaryCheckbox = Template.bind({});

PrimaryCheckbox.args = {
  disabled: false,
  color: 'primary',
  label: 'checkbox',
  labelplacement: 'end',
  value: 'Checkbox',
};

export const SecondaryCheckbox = Template.bind({});

SecondaryCheckbox.args = {
  disabled: false,
  color: 'secondary',
  label: 'checkbox',
  labelplacement: 'end',
  value: 'Checkbox',
};

export const DisableCheckbox = Template.bind({});

DisableCheckbox.args = {
  disabled: true,
  color: 'primary',
  label: 'checkbox',
  labelplacement: 'end',
  value: 'Checkbox',
};

export const LabelLeftCheckbox = Template.bind({});

LabelLeftCheckbox.args = {
  disabled: false,
  color: 'primary',
  label: 'checkbox',
  labelplacement: 'start',
  value: 'Checkbox',
};

export const LabelUpCheckbox = Template.bind({});

LabelUpCheckbox.args = {
  disabled: false,
  color: 'primary',
  label: 'checkbox',
  labelplacement: 'top',
  value: 'Checkbox',
};

export const LabelBottomCheckbox = Template.bind({});

LabelBottomCheckbox.args = {
  disabled: false,
  color: 'primary',
  label: 'checkbox',
  labelplacement: 'bottom',
  value: 'Checkbox',
};
