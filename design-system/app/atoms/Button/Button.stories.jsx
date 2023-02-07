import React from 'react';

import StoryWrapper from 'molecules/utility/StoryWrapper';
import Button from './Button';

export default {
  title: 'Components/Buttons/Button',
  component: Button,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC', 'AUTOMOTIVE'] },
    },

    size: {
      control: { type: 'select', options: ['large', 'medium', 'small'] },
    },
    variant: {
      control: {
        type: 'select',
        options: ['contained', 'outlined', 'default'],
      },
    },
  },
};

const Template = ({ ...args }) => (
  <StoryWrapper themeVariant={args.themeType}>
    <Button {...args} variant="contained">
      Button
    </Button>
    <br />
    <Button {...args} variant="outlined">
      Button
    </Button>
    <br />
  </StoryWrapper>
);

export const LargeSizeButton = Template.bind({});
LargeSizeButton.args = {
  isLoading: false,
  disabled: false,
  size: 'large',
  href: '',
};

export const SmallSizeButton = Template.bind({});
SmallSizeButton.args = {
  isLoading: false,
  disabled: false,
  size: 'small',
  href: '',
};

export const MediumSizeButton = Template.bind({});
MediumSizeButton.args = {
  isLoading: false,
  disabled: false,
  size: 'medium',
  href: '',
};

export const LoadingButton = Template.bind({});
LoadingButton.args = {
  isLoading: true,
  disabled: false,
  size: 'large',
  href: '',
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  isLoading: false,
  disabled: true,
  size: 'large',
  href: '',
};

export const DisabledLoadingButton = Template.bind({});
DisabledLoadingButton.args = {
  isLoading: true,
  disabled: true,
  size: 'large',
  href: '',
};
