import React from 'react';
import StoryWrapper from 'molecules/utility/StoryWrapper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import defaultContent from './defaultContent';
import SwipeableView from './SwipeableView';

export default {
  title: 'Components/Carousel/SwipeableView',
  component: SwipeableView,
  argTypes: {
    themeType: {
      control: { type: 'select', options: ['DEFAULT', 'MPC'] },
    },
    className: { table: { disable: true } },
  },
};

const Template = args => (
  <StoryWrapper themeVariant={args.themeType}>
    <SwipeableView {...args} />
  </StoryWrapper>
);

export const AutoPlayCarousel = Template.bind({});
AutoPlayCarousel.args = {
  autoplay: true,
  direction: 'rtl',
  content: defaultContent(1),
  maxSteps: defaultContent(1).length,
  nextIcon: <ArrowForwardIcon />,
  backIcon: <ArrowBackIcon />,
};
