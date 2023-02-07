import React from 'react';
import CounterListItem from './CounterListItem';
import StoryWrapper from '../utility/StoryWrapper';

export default {
  title: 'Components/Lists/CounterListItem',
  component: CounterListItem,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    className: { table: { disable: true } },
    onIncrement: { table: { disable: true } },
    onDecrement: { table: { disable: true } },
  },
};

const cartImage = require('images/panadol.png');

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>
    <CounterListItem {...args} />
  </StoryWrapper>
);

export const PrimaryCounterListItem = Template.bind({});

PrimaryCounterListItem.args = {
  image: cartImage,
  title: 'Panadol',
  subTitle: 'AED 13.50',
  count: 1,
};
