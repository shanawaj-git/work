import React from 'react';
import StoryWrapper from 'molecules/utility/StoryWrapper';
import Tabs from './Tabs';
import { AVAILABLE_SIZES } from './functions';

export default {
  title: 'Components/Containers/Tabs',
  component: Tabs,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    tabs: { table: { disable: true } },
    id: { table: { disable: true } },
    onChangeCallback: { table: { disable: true } },

    size: {
      control: { type: 'select', options: AVAILABLE_SIZES },
    },
  },
  decorators: [Story => <StoryWrapper>{Story()}</StoryWrapper>],
};

const defaultProps = {
  tabs: [{ label: 'delivery', value: 0 }, { label: 'tab & collect', value: 1 }],
};

const render = props => (
  <>
    <Tabs {...props} />
  </>
);

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>{render(args)}</StoryWrapper>
);

export const Standard = Template.bind({});
Standard.args = {
  ...defaultProps,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...defaultProps,
  variant: 'fullWidth',
};

export const scrollable = Template.bind({});
scrollable.args = {
  ...defaultProps,
  variant: 'scrollable',
  tabs: [
    ...defaultProps.tabs,
    { label: 'tab number #3', value: 2 },
    { label: 'tab number #4', value: 3 },
    { label: 'tab number #5', value: 4 },
    { label: 'tab number #6', value: 5 },
    { label: 'tab number #7', value: 6 },
    { label: 'tab number #8', value: 7 },
    { label: 'tab number #9', value: 8 },
    { label: 'tab number #10', value: 9 },
    { label: 'tab number #11', value: 10 },
    { label: 'tab number #12', value: 11 },
  ],
};

export const UnderlinedTabs = Template.bind({});
UnderlinedTabs.args = {
  ...defaultProps,
  variant: 'fullWidth',
  underline: true,
  size: 'extraSmall',
};

export const PreSelectedTab = Template.bind({});
PreSelectedTab.args = {
  ...defaultProps,
  preSelectedTab: 3,
  tabs: [
    ...defaultProps.tabs,
    { label: 'tab number #3', value: 2 },
    { label: 'tab number #4', value: 3 },
    { label: 'tab number #5', value: 4 },
  ],
};
