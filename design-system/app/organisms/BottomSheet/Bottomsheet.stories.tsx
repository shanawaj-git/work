import React from 'react';
import StoryWrapper from 'molecules/utility/StoryWrapper';
import BottomSheet from './index';

export default {
  title: 'Components/BottomSheet/BottomSheet',
  component: BottomSheet,
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
    <BottomSheet {...args}>BottomSheet</BottomSheet>
  </StoryWrapper>
);

export const DefaultMap = Template.bind({});

DefaultMap.args = {
  open: true,
  blocking: false,
  snapPoints: ({ maxHeight }) => [maxHeight * 0.5, maxHeight * 0.9],
};

export const NonBlocking = Template.bind({});

NonBlocking.args = {
  open: true,
  snapPoints: ({ maxHeight }) => [maxHeight * 0.5, maxHeight * 0.9],
};
export const withFooter = Template.bind({});

withFooter.args = {
  open: true,
  snapPoints: ({ maxHeight }) => [maxHeight * 0.5, maxHeight * 0.9],
  footer: <p>Footer</p>,
};
export const withHeader = Template.bind({});

withHeader.args = {
  open: true,
  snapPoints: ({ maxHeight }) => [maxHeight * 0.5, maxHeight * 0.9],
  header: <p>Header</p>,
};
