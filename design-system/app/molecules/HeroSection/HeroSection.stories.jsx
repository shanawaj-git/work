import React from 'react';

import StoryWrapper from 'molecules/utility/StoryWrapper';
import HeroSection from './HeroSection';

export default {
  title: 'Components/Containers/Cards/HeroSection',
  component: HeroSection,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    className: { table: { disable: true } },
  },
};

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>
    <HeroSection {...args} />
  </StoryWrapper>
);

export const HeroSectionComponent = Template.bind({});

const icon = require('images/header-image.png');
const titleLogo = require('images/next-health-logo-primary.svg');

HeroSectionComponent.args = {
  image: icon,
  title: 'Welcome to',
  titleLogo,
  headLine:
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};
