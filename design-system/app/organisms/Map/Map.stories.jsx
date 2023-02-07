import React from 'react';
import Map from './Map';
import StoryWrapper from 'molecules/utility/StoryWrapper';

export default {
  title: 'Components/Map/MapComponent',
  component: Map,
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
    <div style={{ height: 500, widht: 500 }}>
      <Map {...args} />
    </div>
  </StoryWrapper>
);

export const DefaultMap = Template.bind({});

DefaultMap.args = {
  woosMapKey: process.env.WOOS_MAP_KEY,
  googleMapKey: process.env.GOOGLE_MAP_KEY,
  initalCordinates: [25.204849, 55.270782],
  onCenterChange: undefined,
};

export const WoosMap = Template.bind({});

WoosMap.args = {
  woosMapKey: process.env.WOOS_MAP_KEY,
  initalCordinates: [25.204849, 55.270782],
  onCenterChange: undefined,
};
export const GoogeMap = Template.bind({});

GoogeMap.args = {
  woosMapKey: process.env.WOOS_MAP_KEY,
  googleMapKey: process.env.GOOGLE_MAP_KEY,
  initalCordinates: [25.204849, 55.270782],
  onCenterChange: undefined,
};
