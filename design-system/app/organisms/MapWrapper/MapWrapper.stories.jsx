import React from 'react';
import StoryWrapper from 'molecules/utility/StoryWrapper';
import MapWrapper from './MapWrapper';

export default {
  title: 'Components/Map/MapWrapper',
  component: MapWrapper,
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
    <MapWrapper {...args} />
  </StoryWrapper>
);

export const DefaultMapWrapper = Template.bind({});
DefaultMapWrapper.args = {
  initalCordinates: [25.204849, 55.270782],
  woosMapKey: process.env.WOOS_MAP_KEY,
  googlePlacesKey: process.env.GOOGLE_PLACES_KEY,
  googleMapKey: process.env.GOOGLE_MAP_KEY,
  title: 'Where would you like',

  subTitle: 'your meds delivered to?',
};
