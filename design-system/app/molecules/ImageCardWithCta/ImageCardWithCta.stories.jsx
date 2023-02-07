import React from 'react';
import ImageCardWithCta from './ImageCardWithCta';
import StoryWrapper from 'molecules/utility/StoryWrapper';

export default {
  title: 'Components/Cards/ImageCardWithCta',
  component: ImageCardWithCta,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
};

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>
    <ImageCardWithCta {...args} />
  </StoryWrapper>
);

export const PrimaryImageCardWithCta = Template.bind({});

const icon = require('images/location-icon.svg');
const buttonIcon = require('images/arow-right.svg');

PrimaryImageCardWithCta.args = {
  cardIcon: icon,
  title: 'We Work offices',
  subTitle: 'The Offices 4, Albatha Next, 8th floor...',
  buttonIcon: buttonIcon,
};
