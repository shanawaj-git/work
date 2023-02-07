import React from 'react';
import Typography, { TypographyType } from '.';
import StoryWrapper from 'molecules/utility/StoryWrapper';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Tokens/React/Typography',
  component: Typography,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    typographyType: {
      control: { type: 'select', options: Object.values(TypographyType) },
    },
    align: {
      control: {
        type: 'select',
        options: ['center', 'inherit', 'justify', 'left', 'right'],
      },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>
    <Typography {...args}>This is a typography components</Typography>
  </StoryWrapper>
);

export const Title1 = Template.bind({});
Title1.args = {
  typographyType: TypographyType.TITLE_1,
  color: '',
  align: '',
};

export const Title2 = Template.bind({});
Title2.args = {
  typographyType: TypographyType.TITLE_2,
  color: '',
  align: '',
};

export const Title3 = Template.bind({});
Title3.args = {
  typographyType: TypographyType.TITLE_3,
  color: '',
  align: '',
};

export const Caption = Template.bind({});
Caption.args = {
  typographyType: TypographyType.CAPTION,
  color: '',
  align: '',
};

export const Callout = Template.bind({});
Callout.args = {
  typographyType: TypographyType.CALL_OUT,
  color: '',
  align: '',
};

export const Headline = Template.bind({});
Headline.args = {
  typographyType: TypographyType.HEAD_LINE,
  color: '',
  align: '',
};
