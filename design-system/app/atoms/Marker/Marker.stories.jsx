import React from 'react';
import PropTypes from 'prop-types';
import StoryWrapper from 'molecules/utility/StoryWrapper';
import Map from 'organisms/Map';
import MARKER_ICON from 'images/marker-icon.svg';
import Marker from './Marker';
const UAE_LAT_LONG = [25.194365, 55.241362];

export default {
  title: 'Components/Map/MapMarker',
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
    <Container args={args} />
  </StoryWrapper>
);

export const DefaultMap = Template.bind({});

DefaultMap.args = {
  initalCordinates: UAE_LAT_LONG,
  woosMapKey: process.env.WOOS_MAP_KEY,
  googleMapKey: process.env.GOOGLE_MAP_KEY,
  icon: {
    url: MARKER_ICON,
    scaledSize: {
      height: 64,
      width: 64,
    },
  },
  labelAnchorCoordinates: UAE_LAT_LONG,
  clickable: true,
  draggable: true,
  labelContent: 'Test',
  labelClass: 'labels', // the CSS class for the label
  labelStyle: { opacity: 1.0 },
};
export const WoosMap = Template.bind({});

WoosMap.args = {
  initalCordinates: UAE_LAT_LONG,
  woosMapKey: process.env.WOOS_MAP_KEY,
  // googleMapKey: process.env.GOOGLE_MAP_KEY,
  icon: {
    url: MARKER_ICON,
    scaledSize: {
      height: 64,
      width: 64,
    },
  },
};

const Container = ({ args }) => (
  <div style={{ height: 500, widht: 500 }}>
    <Map
      woosMapKey={args.woosMapKey}
      googleMapKey={args.googleMapKey}
      initalCordinates={[25.204849, 55.270782]}
    >
      {args && <Marker {...args} />}
    </Map>
  </div>
);

// proptypes
Container.propTypes = {
  args: PropTypes.object,
};
